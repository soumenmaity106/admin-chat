module.exports = function (app) {
    var programslist = require('../controllers/programslist.controllers');

    //Create a New Programslist
    //app.post('/api/programslist',programslist.create)

    //Retrieve all Programslist
    app.get('/api/programslist', programslist.findAll)
    
    // Retrieve a serach
    app.get('/api/programslist/search/?', programslist.serach);

    // Retrieve a single CourseLists by Id
    app.get('/api/programslist/:programslistId', programslist.findOne);
}