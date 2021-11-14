const FILEPATH = RNFS.DocumentDirectoryPath + "/rooms.json";

import RNFS from 'react-native-fs';

import PermissionService from './PermissionService';

export default class JsonService {

    static getPermissions = async () => {
        await PermissionService.getReadPermission();
        await PermissionService.getWritePermission();
    }

    static getRooms = async () => {
        await this.getPermissions();

        if(! await RNFS.exists(FILEPATH)) {
            this.setRooms([{
                name: "empty",
                max: 0,
                min: 0,
                avg: 0
            }]);
        }

        let res = await RNFS.readFile(FILEPATH, 'utf8').then();

        if(res) {
            return JSON.parse(res)
        }
    }

    static isRoomNameInUse = async (name) => {
        await this.getPermissions();

        let isRoomNameInUse = false;
        if(await RNFS.exists(FILEPATH)) {
            let rooms = await this.getRooms();
            let item = rooms.find(i => i.name == name);
            isRoomNameInUse = (item?.name ? true : false);
        }
        return isRoomNameInUse;
    }

    static removeRoom = async (name) => {
        await this.getPermissions();

        if(await RNFS.exists(FILEPATH)) {
            let rooms = await this.getRooms();
            rooms = rooms.filter(function(item) {
                return item.name !== name
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
