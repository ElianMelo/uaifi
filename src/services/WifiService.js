import WifiManager from "react-native-wifi-reborn";

export default class WifiService {
    static getSignal = async () => {
        let dbm = await WifiManager.getCurrentSignalStrength();
        return dbm;
    }

    static getWifiList = async () => {
        let list = await WifiManager.loadWifiList();
        return list;
    }
}
