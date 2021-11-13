import WifiManager from "react-native-wifi-reborn";

export default class WifiService {
    static getSignal = async () => {
        let dbm = await WifiManager.getCurrentSignalStrength();
        return dbm;
    }

    static getWifiList = () => {
        WifiManager.loadWifiList().then(
            (result) => {
                console.log(result);
            }
        );
    }
}
