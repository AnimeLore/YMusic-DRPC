'use strict'
import * as semver from 'semver'
import { app } from 'electron'
import { autoUpdater, UpdateCheckResult } from 'electron-updater'
import { state } from '../state'
import { UpdateUrgency } from './constants/updateUrgency'
import { UpdateStatus } from './constants/updateStatus'
import log from 'electron-log'
import { UpdateInfo as ElectronUpdateInfo } from 'electron-updater'
import logger from '../logger'

type UpdateInfo = {
    version: string;
    updateUrgency?: UpdateUrgency;
    commonConfig?: any;
};

type DownloadResult = any;

type UpdateResult = {
    downloadPromise?: Promise<DownloadResult>;
    updateInfo: UpdateInfo;
};

class Updater {
    private latestAvailableVersion: string | null = null;
    private updateStatus: UpdateStatus = UpdateStatus.IDLE;
    private updaterId: NodeJS.Timeout | null = null;
    private onUpdateListeners: Array<(version: string) => void> = [];
    private logger;
    private commonConfig: any;

    constructor() {
        this.logger = logger;
        this.commonConfig = this.commonConfig || {};
        autoUpdater.logger = require("electron-log");
        autoUpdater.autoRunAppAfterInstall = true;

        autoUpdater.on('error', (error) => {
            this.logger.updater.log('Updater error', error);
        });

        autoUpdater.on('checking-for-update', () => {
            this.logger.updater.log('Checking for update');
        });

        autoUpdater.on('update-downloaded', (updateInfo: UpdateInfo) => {
            this.logger.updater.log('Update downloaded', updateInfo.version);

            if (updateInfo.updateUrgency === UpdateUrgency.HARD) {
                this.logger.updater.log('This update should be installed now');
                this.install();
                return;
            }

            if (this.commonConfig && this.commonConfig.DEPRECATED_VERSIONS) {
                const isDeprecatedVersion = semver.satisfies(app.getVersion(), this.commonConfig.DEPRECATED_VERSIONS);
                if (isDeprecatedVersion) {
                    this.logger.updater.log('This version is deprecated', app.getVersion(), this.commonConfig.DEPRECATED_VERSIONS);
                    this.install();
                    return;
                }
            }

            this.latestAvailableVersion = updateInfo.version;
            this.onUpdateListeners.forEach((listener) => listener(updateInfo.version));
        });
    }

    private updateApplier(updateResult: UpdateResult) {
        const { downloadPromise, updateInfo } = updateResult;

        if (updateInfo.updateUrgency !== undefined) {
            this.logger.updater.info('Urgency', updateInfo.updateUrgency);
        }

        if (updateInfo.commonConfig !== undefined) {
            this.logger.updater.info('Common config', updateInfo.commonConfig);
            for (const key in updateInfo.commonConfig) {
                if (updateInfo.commonConfig.hasOwnProperty(key)) {
                    if (!this.commonConfig) {
                        this.commonConfig = {};
                    }
                    this.commonConfig[key] = updateInfo.commonConfig[key];
                    this.logger.updater.info(`Updated commonConfig: ${key} = ${updateInfo.commonConfig[key]}`);
                }
            }
        }

        if (!downloadPromise) {
            return;
        }

        this.logger.updater.info('New version available', app.getVersion(), '->', updateInfo.version);
        this.updateStatus = UpdateStatus.DOWNLOADING;

        downloadPromise
            .then((downloadResult) => {
                if (downloadResult) {
                    this.updateStatus = UpdateStatus.DOWNLOADED;
                    this.logger.updater.info(`Download result: ${downloadResult}`);
                }
            })
            .catch((error) => {
                this.updateStatus = UpdateStatus.IDLE;
                this.logger.updater.error('Downloader error', error);
            });
    }

    async check() {
        if (this.updateStatus !== UpdateStatus.IDLE) {
            this.logger.updater.log('New update is processing', this.updateStatus);
            return;
        }

        try {
            const updateResult = await autoUpdater.checkForUpdates();
            if (!updateResult) {
                this.logger.updater.log('No update found');
                return;
            }
            this.updateApplier(updateResult);
        } catch (error) {
            this.logger.updater.error('Update check error', error);
        }
    }

    start() {
        this.check();
        this.updaterId = setInterval(() => {
            this.check();
        }, 900000);
    }

    stop() {
        if (this.updaterId) {
            clearInterval(this.updaterId);
        }
    }

    onUpdate(listener: (version: string) => void) {
        this.onUpdateListeners.push(listener);
    }

    install() {
        this.logger.updater.info('Installing a new version', this.latestAvailableVersion);
        state.willQuit = true;
        autoUpdater.quitAndInstall();
    }
}
exports.Updater = Updater
export const getUpdater = (() => {
    let updater: Updater | undefined
    return () => {
        if (!updater) {
            updater = new Updater()
        }
        return updater
    }
})()
