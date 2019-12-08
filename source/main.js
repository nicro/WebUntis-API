const wu = require('./webuntis')();

   wu.authenticate('', '', '', '').then ( () => { 
           wu.simple_requests.getStatusData()
           .then( console.log )
           .then( () =>  wu.logout() );
       });
