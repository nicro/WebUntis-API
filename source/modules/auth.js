class auth {
    constructor(rpc) {
        this.rpc = rpc;
    }
    authenticate(host_name, school_name, login, password, client) {
        this.rpc.set_settings(host_name, school_name);

        return new Promise( (resolve, reject) => {
            this.rpc.query(`authenticate`, {'user': `${login}`, 'password': `${password}`,'client': `${client}`}).then (resolve);
        });
    }

    logout() { return this.rpc.sendSimpleRequest(`logout`); }

};

module.exports = function(rpc) {
    return new auth(rpc);
}