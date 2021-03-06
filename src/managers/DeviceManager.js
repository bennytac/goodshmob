// @flow

import RNFirebase from 'react-native-firebase'
import type {Device} from "../types"
import * as appActions from "../auth/actions"
import * as DeviceInfo from 'react-native-device-info'
//import {toUppercase} from "./utils/StringUtils";
import * as StringUtils from "../helpers/StringUtils"
import {flatDiff} from "../helpers/StringUtils"
import Permissions from "react-native-permissions"


let instance: DeviceManager;

class DeviceManager {

    store: any;
    device: Device

    //waiting for user login to save the device
    init(store): DeviceManager {
        this.store = store;
        return this;
    }

    obtainDeviceDiff(): Promise<*> {
        return new Promise((resolve, reject) => {
            generateCurrentDevice().then(newDevice => {
                let oldDevice: Device= {...this.store.getState().device};
                let diff = flatDiff(oldDevice, newDevice);
                ['currentDeviceId', 'uniqueId', 'deviceId'].forEach(k=>_.unset(diff, k));
                resolve({newDevice, diff});
            })
        });

    }

    getInfo(property) {
        const device = this.store.getState().device;
        return device && device[property];
    }

    checkAndSendDiff() {
        console.debug("device manager: checkAndSendDiff");

        this.obtainDeviceDiff()
            .then(({newDevice, diff}) => {
                if (!_.isEmpty(diff)) {
                    console.info(`device manager: found differences in device. diff=${JSON.stringify(diff)}`);

                    this.store.dispatch(appActions.saveDevice(newDevice))
                        .then((device)=>{
                            console.info("new device saved");

                            this.obtainDeviceDiff().then(({diff}) => {
                                if (!_.isEmpty(diff)) {
                                    console.warn("Device not properly saved: remaining diff=" , diff);
                                    console.warn(device);
                                }
                            });
                        }, err=>console.warn(err));
                }
                else {
                    console.log("device are the same 1")
                }
            })

    }
}

export function init(store) {
    return (instance = new DeviceManager().init(store));
}

export function checkAndSendDiff() {
    instance.checkAndSendDiff();
}

export function getDeviceInfo(property: string) {
    return instance.getInfo(property);
}

async function generateCurrentDevice(): Promise<Device> {
    let messaging = RNFirebase.app().messaging();

    const result = {}

    let adapt = (fields, prepend, withPrefix = false) => {
        fields.reduce((result, input) => {
            let deviceKey, fxName;

            if (typeof input === 'string') {
                let f = input;
                let toUppercase = StringUtils.toUppercase(f);

                fxName = prepend + toUppercase;
                deviceKey = withPrefix ? prepend + toUppercase : f;
            }
            else if (typeof input === 'object') {
                fxName = input.fxName;
                deviceKey = input.deviceKey;
            }

            // $FlowFixMe
            let fx = DeviceInfo[fxName];
            if (!fx) throw "not found:" + fx;
            try {
                // $FlowFixMe
                result[deviceKey] = fx();
            }
            catch(err) {
                console.warn(err);
            }
            return result;
        }, result);
    }

    adapt([
        {fxName: "getUniqueID", deviceKey: "uniqueId"},"manufacturer","brand","model","deviceId","systemName",
        "systemVersion","bundleId","buildNumber","version","readableVersion",
        "deviceName","userAgent","deviceLocale","deviceCountry","timezone"
    ], "get");
    adapt(["emulator","tablet"], "is", true);

    result.fcmToken = await messaging.getToken()
    result.permissionReadContacts = await Permissions.check('contacts')
    result.permissionNotifications = __IS_ANDROID__ ?
        (await messaging.hasPermission() ? "authorized" : "denied") : await Permissions.check('notification')

    return result
}
