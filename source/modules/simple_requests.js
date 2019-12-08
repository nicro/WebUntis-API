/*
*     12.8.2019
*
*    Simple requests without params
*    passing method name to rpc::sendSimpleRequest
*
*/


class requests {
    constructor(rpc) {
        this.rpc = rpc;
    }

    getTeachers() { 
        return this.rpc.sendSimpleRequest(`getTeachers`); 
    }

    getStudents() { 
        return this.rpc.sendSimpleRequest(`getStudents`); 
    }

    getKlassen() { 
        return this.rpc.sendSimpleRequest(`getKlassen`); 
    }

    getSubjects() { 
        return this.rpc.sendSimpleRequest(`getSubjects`); 
    }
    getRooms() { 
        return this.rpc.sendSimpleRequest(`getRooms`); 
    }
    getDepartments() { 
        return this.rpc.sendSimpleRequest(`getDepartments`); 
    }
    getHolidays() { 
        return this.rpc.sendSimpleRequest(`getHolidays`); 
    }
    getTimegridUnits() { 
        return this.rpc.sendSimpleRequest(`getTimegridUnits`); 
    }
    getStatusData() { 
        return this.rpc.sendSimpleRequest(`getStatusData`); 
    }
    getCurrentSchoolyear() {
        return this.rpc.sendSimpleRequest(`getStatusData`);
    }
    getSchoolyears() {
        return this.rpc.sendSimpleRequest(`getSchoolyears`);
    }
};

module.exports = function(rpc) {
    return new requests(rpc);
}