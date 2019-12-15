const wu   = require('./webuntis')();
const Time = require('./structures').Time;

const cr = require('../.././credentials.json');


wu.authenticate(cr.server, cr.school, cr.user, cr.password)
.then ( () => { 
       wu.getTimetable(new Time(2019, 12, 17), new Time(2019, 12, 17))
       .then(console.log)
       .then( () => wu.logout());
})
.catch(console.log);