module.exports = function (app) {
    var courselist = require('../controllers/courselist.controllers');
    //const checkAuth = require('../middleware/check-auth');

    //Create a New Courselist
   // app.post('/api/courselists', checkAuth, courselist.create)

   //Create a New Courselist
   //app.post('/api/courselists',  courselist.create)

    //Retrieve all CourseLists
    app.get('/api/courselists', courselist.findAll) 

    // Retrieve a single search
    app.get('/api/courselists/search/?', courselist.serach);

    // Retrieve a single CourseLists by Id
    app.get('/api/courselists/:courselistId', courselist.findOne);   

   // Retrieve a update CourseLists by Id
   // app.put('/api/courselists/:courselistId', checkAuth, courselist.update);

    // Retrieve a delete CourseLists by Id
    //app.delete('/api/courselists/:courselistId', checkAuth, courselist.delete);
}