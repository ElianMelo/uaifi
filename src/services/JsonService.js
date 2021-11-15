const FILEPATH = RNFS.DocumentDirectoryPath + "/rooms.json";

import RNFS from 'react-native-fs';

import PermissionService from './PermissionService';

export default class JsonService {

    static lastSetLength = null;

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
            if(this.lastSetLength) {
                res = res.split(0, this.lastSetLength);
            }

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
        let stringNewRooms = JSON.stringify(newRooms);
        this.lastSetLength = stringNewRooms.length;
        res = await RNFS.writeFile(FILEPATH, stringNewRooms, 'utf8').then();

        return res ? true : false;
    }
}
