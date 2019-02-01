module.exports = function(app){
    var management = require('../controllers/management.controllers');

    //Create a New management
    //app.post('/api/management',management.create)

    //Retrieve all management
   app.get('/api/management',management.findAll)

   // Retrieve a single search
   app.get('/api/management/search/?', management.serach);

    // Retrieve a single management by Id
    app.get('/api/management/:managementId', management.findOne);
}