module.exports = function(app){
    var coursedetails = require('../controllers/coursedetails.controllers');

    //Create a New coursedetails
    //app.post('/api/coursedetails',coursedetails.create)

    //Retrieve all coursedetails
    app.get('/api/coursedetails',coursedetails.findAll)

    // Update a Customer with Id
   // app.put('/api/coursedetails/:coursedetailsId', coursedetails.update);

    // Retrieve a serach
    app.get('/api/coursedetails/search/?', coursedetails.serach);

    // Retrieve a single coursedetails by Id
    app.get('/api/coursedetails/:coursedetailsId', coursedetails.findOne);
}