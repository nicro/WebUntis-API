class WebUntis {
    constructor() {
        this.https           = require('https');
        this.rpc             = require('./rpc')                     (this.https);
        this.auth            = require('./modules/auth')            (this.rpc);
        this.simple_requests = require('./modules/simple_requests') (this.rpc);
    }

    update_sessionId(res) {
        return this.rpc.set_sessionId(res['result']['sessionId']);
    }

    authenticate(host_name, school_name, login, password) {

        this.host_name   =  host_name;
        this.school_name =  school_name;

        return new Promise ((resolve, reject) => {
            this.auth.authenticate(host_name, school_name, login, password, 'ANDROID')
            .then(res => this.update_sessionId(res))
            .then(resolve);
        });
    }    

    logout() { 
        return this.auth.logout(); 
    }
};

module.exports = function() {
    return new WebUntis();
}









/*

    getTeachers() { 
        return this.requests.getTeachers();
    }

    getStudents() { 
        return this.requests.getStudents();
    }

    getSubjects() { 
        return this.requests.getSubjects();
    }

    getRooms() { 
        return this.requests.getRooms();
    }

    getDepartments() { 
        return this.requests.getDepartments();
    }

    getHolidays() { 
        return this.requests.getHolidays();
    }

    getTimegridUnits() { 
        return this.requests.getTimegridUnits();
    }

    getStatusData() { 
        return this.requests.getStatusData();
    }

    getCurrentSchoolyear() { 
        return this.requests.getCurrentSchoolyear();
    }

    getSchoolyears() { 
        return this.requests.getSchoolyears();
    }
*/