class WebUntis {
    constructor() {
        this.https           = require('https');
        this.structures      = require('./structures');
        this.rpc             = require('./rpc')                     (this.https);
    }

    update_sessionId (res) {
        if (res.error != undefined) throw 'error';
        this.rpc.sessionId  = res.result.sessionId;
        this.rpc.klasseId   = res.result.klasseId;
        this.rpc.personType = res.result.personType;
        this.rpc.personId   = res.result.personId;
    }

    authenticate(host_name, school_name, login, password) {

        this.host_name   =  host_name;
        this.school_name =  school_name;

        return new Promise ((resolve, reject) => {
            this.rpc.set_settings(host_name, school_name);
            this.rpc.query(`authenticate`, {'user': `${login}`, 'password': `${password}`,'client': 'ANDROID'})
            .then(res => {
                this.update_sessionId(res);
            })
            .then(resolve)
            .catch(reject)
        });
    }

    logout() { 
        return this.rpc.sendSimpleRequest(`logout`);
    }

    /*
    Simple requests requiring 
    no additional params
    */

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

    getLatestImportTime() {
        return this.rpc.sendSimpleRequest('getLatestImportTime');
    }

    /*
    Timetable requests
    */

    getTimetable(_startDate, _endDate) {
        return this.rpc.query('getTimetable', {
            'id': this.rpc.personId,
            'type': this.rpc.personType,
            'startDate': _startDate.unite(), 
            'endDate': _endDate.unite()
        });
    }

};

module.exports = function() {
    return new WebUntis();
}