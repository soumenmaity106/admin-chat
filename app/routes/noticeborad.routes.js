module.exports = function(app){
    var noticeboard = require('../controllers/noticeborad.controllers');

    //Create a New noticeboard
    //app.post('/api/noticeboard',noticeboard.create)

    //Retrieve all noticeboard
   app.get('/api/noticeboard',noticeboard.findAll)

   // Retrieve a single search
   app.get('/api/noticeboard/search/?', noticeboard.serach);

    // Retrieve a single noticeboard by Id
    app.get('/api/noticeboard/:noticeboardId', noticeboard.findOne);
}