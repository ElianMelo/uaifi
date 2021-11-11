export default class IntervalService {

    static calcInterval = (dbm) => {
        if(dbm < -80) {
            return {code: 0, desc: "Inutilizável"};
        } else if (dbm < -70) {
            return {code: 1, desc: "Fraco"};
        } else if (dbm < -67) {
            return {code: 2, desc: "Bom"};
        } else if(dbm < -30) {
            return {code: 3, desc: "Muito bom"};
        } else {
            return {code: 4, desc: "Excelente"};
        }
    }
}
