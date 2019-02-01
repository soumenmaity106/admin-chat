module.exports = function(app){
    var facilitis = require('../controllers/facilitis.controllers');

    //Create a New facilitis
    //app.post('/api/facilitis',facilitis.create)

    //Retrieve all facilitis
   app.get('/api/facilitis',facilitis.findAll)

   // Retrieve a single search
   app.get('/api/facilitis/search/?', facilitis.serach);

    // Retrieve a single facilitis by Id
    app.get('/api/facilitis/:facilitisId', facilitis.findOne);
}