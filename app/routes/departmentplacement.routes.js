module.exports = function(app){
    var departmentplacement = require('../controllers/departmentplacement.controllers');

    //Create a New Department Placement
    //app.post('/api/departmentplacements',departmentplacement.create)

    //Retrieve all Department Placement
    app.get('/api/departmentplacements',departmentplacement.findAll)

    // Retrieve a serach
    app.get('/api/departmentplacements/search/?', departmentplacement.serach);

    // Retrieve a single  Department Placement by Id
    app.get('/api/departmentplacements/:departmentplacementId', departmentplacement.findOne);
}