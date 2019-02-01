module.exports = function(app){
    var placement = require('../controllers/placement.controllers');

    //Create a New Placement
    //app.post('/api/placements',placement.create)

    //Retrieve all Placement
    app.get('/api/placements',placement.findAll)   

    // Retrieve a serach
    app.get('/api/placements/search/?', placement.serach);

     // Retrieve a single Placement by Id
     app.get('/api/placements/:placementId', placement.findOne);
}