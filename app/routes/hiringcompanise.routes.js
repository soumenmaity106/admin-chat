module.exports = function(app){
    var hiringcompanise = require('../controllers/hiringcompanise.controllers');

    //Create a New hiringcompanise
    //app.post('/api/hiringcompanises',hiringcompanise.create)

    //Retrieve all hiringcompanises
   app.get('/api/hiringcompanises',hiringcompanise.findAll)

    // Retrieve a serach
    app.get('/api/hiringcompanises/search/?', hiringcompanise.serach);

    // Retrieve a single hiringcompanises by Id
    app.get('/api/hiringcompanises/:hiringcompaniseId', hiringcompanise.findOne);
}