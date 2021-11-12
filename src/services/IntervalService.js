export default class IntervalService {

    static calcInterval = (dbm) => {
        if(dbm < -80) {
            return {code: 0, desc: "Inutilizável", graph: 10};
        } else if (dbm < -70) {
            return {code: 1, desc: "Fraco", graph: 20};
        } else if (dbm < -67) {
            return {code: 2, desc: "Bom", graph: 60};
        } else if(dbm < -30) {
            return {code: 3, desc: "Muito bom", graph: 80};
        } else {
            return {code: 4, desc: "Excelente", graph: 100};
        }
    }
}
