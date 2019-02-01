module.exports = function(app){
    var centers = require('../controllers/centers.controllers');

    //Create a New centers
    //app.post('/api/centers',centers.create)

    //Retrieve all centers
   app.get('/api/centers',centers.findAll)

   // Retrieve a serach
   app.get('/api/centers/search/?', centers.serach);

    // Retrieve a single centers by Id
    app.get('/api/centers/:centersId', centers.findOne);
}