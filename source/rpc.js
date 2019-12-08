class rpc {
    constructor(_https) {
        this.https       = _https;
        this.sessionId   = '';
        this.link   = '';
        this.base_link = '/WebUntis/jsonrpc.do?school='
    }

    set_sessionId(_sessionId) {
        this.sessionId = _sessionId;
    }

    set_settings(host_name, school_name) {
        this.link = `${host_name}${this.base_link}${school_name}`;
    }

    generate_options(target) {
        var options = {
            hostname: '',
            port: 443,
            path: '',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${this.sessionId}`
            }
          };
    
        let sp_l = target.split('/');
        options.hostname = sp_l[0];
    
        for (let i = 1; i<sp_l.length; i++)
            options.path += `/${sp_l[i]}`;
        return options;
    }
    
    
    generate_params(method, params) {
        return JSON.stringify({
            'id': '15',
            'method': `${method}`,
            "jsonrpc":"2.0",
            "params": params
          });
    }
    
    
    query(method, params) {
        return new Promise( (resolve, reject) => {
            let chuncks = [];
            
            const req = this.https.request (
                this.generate_options(this.link), 
                res => { 
                    res.on ('data',   ch => chuncks.push(ch) );
                    res.on('end', () => { resolve (JSON.parse(Buffer.concat(chuncks).toString()) ); });
                }
            );
            req.write( this.generate_params( method, params ) );
            req.end();
        });
    }

    sendSimpleRequest(method) {
        return new Promise( (resolve, reject) =>
            this.query(method, { } ).then (resolve)
        );
    }
};

module.exports = function(_https) {
    return new rpc(_https);
}