import RNFS from 'react-native-fs';

const FILEPATH = RNFS.DocumentDirectoryPath + "/rooms.json";

import PermissionService from './PermissionService';

export default class JsonService {

    static getPermissions = async () => {
        await PermissionService.getReadPermission();
        await PermissionService.getWritePermission();
    }

    static getRooms = async () => {
        await this.getPermissions();

        if(! await RNFS.exists(FILEPATH)) {
            this.setRooms([]);
        }

        let res = await RNFS.readFile(FILEPATH, 'utf8').then();

        try {
            return JSON.parse(res);
        } catch(err) {
            return null;
        }
    }

    static isRoomNameInUse = async (name) => {
        await this.getPermissions();

        let nameInUse = false;
        if(await RNFS.exists(FILEPATH)) {
            let rooms = await this.getRooms().then();
            let item = rooms?.find(i => i.name == name);
            nameInUse = (item?.name ? true : false);
        }
        return nameInUse;
    }

    static removeRoom = async (name) => {
        await this.getPermissions();

        if(await RNFS.exists(FILEPATH)) {
            let rooms = await this.getRooms();
            rooms = rooms?.filter(function(item) {
                return item?.name != name
            });
            await this.setRooms(rooms);
        }
    }

    static setRooms = async (newRooms) => {
        await this.getPermissions();

        let res = null;
        res = await RNFS.writeFile(FILEPATH, JSON.stringify(newRooms), 'utf8').then();

        return res ? true : false;
    }
}
