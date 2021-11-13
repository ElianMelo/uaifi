
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

    static getWritePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Permissão de escrita é necessário para salvar cômodos",
                    message:
                        "Esse aplicativo precisa de sua permissão de escrita" +
                        "para salvar os cômodos.",
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

    static getReadPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permissão de leitura é necessário para ler cômodos",
                    message:
                        "Esse aplicativo precisa de sua permissão de leitura" +
                        "para ler os cômodos.",
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
