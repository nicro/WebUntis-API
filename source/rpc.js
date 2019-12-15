class rpc {
    constructor(_https) {
        this.https       = _https;

        this.sessionId   = '';
        this.personType  = '';
        this.personId    = '';
        this.klasseId    = '';

        this.link   = '';
        this.base_link = '/WebUntis/jsonrpc.do?school='
    }

    set_settings(host_name, school_name) {
        this.link = `${host_name}${this.base_link}${school_name}`;
    }

    generate_options(target, req_length) {
        var options = {
            hostname: '',
            port: 443,
            path: '',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Cookie': `JSESSIONID=${this.sessionId}`,
            "Content-Length": `${req_length}`
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
            "params": params,
            "jsonrpc":"2.0"
          });
    }
    
    
    query(_method, _params) {
        return new Promise( (resolve, reject) => {
            let chuncks = [];

            var params  = this.generate_params( _method, _params );
            var options =  this.generate_options(this.link, params.length);

            const req = this.https.request (
                options, res => {
                    res.on ('data',   ch => chuncks.push(ch) );
                    res.on('end', () => { 
                        var resp = JSON.parse(Buffer.concat(chuncks).toString());
                        console.log(resp);
                        resolve (resp); 
                    });
                }
            );
            req.write(params);
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