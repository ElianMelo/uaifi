
import {
    PermissionsAndroid,
} from 'react-native';

export default class PermissionService {
    static getPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Permissão de localização é necessário para conexões WiFi",
                    message:
                        "Esse aplicatiVO precisa de sua permissão de localização" +
                        "para buscar por conexões wifi.",
                    buttonNegative: 'RECUSAR',
                    buttonPositive: 'PERMITIR',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err) {
            console.warn(err)
            return false;
        }
    }
}
