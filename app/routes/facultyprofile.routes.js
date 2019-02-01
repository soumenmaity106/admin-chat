module.exports = function(app){
    var facultyprofile = require('../controllers/facultyprofile.controllers');

    //Create a New Faculty Profile
    //app.post('/api/facultyprofiles',facultyprofile.create)

    //Retrieve all Faculty Profile
    app.get('/api/facultyprofiles',facultyprofile.findAll)

    //Retrieve all Faculty Profile
    app.get('/api/facultyprofiles/search/?',facultyprofile.search)

    // Retrieve a single Faculty Profile by Id
    app.get('/api/facultyprofiles/:facultyprofilesId', facultyprofile.findOne);
}