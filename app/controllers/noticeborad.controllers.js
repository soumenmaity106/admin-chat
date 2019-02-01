const Noticeboard = require('../models/noticeborad.model');

//Post a noticeboard
exports.create = (req,res) =>{
    //Create a noticeboard 
    const noticeboard = new Noticeboard({
        date:req.body.date,
        newstype:req.body.newstype,
        newsText:req.body.newsText,
        details:req.body.details,       
    })
    //Save noticeboard in Mogodb
    noticeboard.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all noticeboard
exports.findAll = (req,res)=>{
    Noticeboard.find()
    .then(noticeboard => {
        if(noticeboard.length  <= 0){
            return  res.status(404).send({
                message:"noticeboard list Dtabase Empty "
            })
        }
        res.send({
            count: noticeboard.length,
            Noticeboard:noticeboard
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a noticeboard
exports.findOne = (req, res) => {
    Noticeboard.findById(req.params.noticeboardId)
    .then(noticeboard => {
        if(!noticeboard) {
            return res.status(404).send({
                message: "noticeboard not found with id " + req.params.noticeboardId
            });            
        }
        res.send(noticeboard);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "noticeboard not found with id " + req.params.noticeboardId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving noticeboardId with id " + req.params.noticeboardId
        });
    });
};

//Find noticeboard Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('date')){
        if (req.query.date.length > 0) {
            serach.date = req.query.date;
        }
    }
    if(req.query.hasOwnProperty('newstype')){
        if (req.query.newstype.length > 0) {
            serach.newstype = req.query.newstype;
        }
    }    
    if(req.query.hasOwnProperty('newsText')){
        if (req.query.newsText.length > 0) {
            serach.newsText = req.query.newsText;
        }
    } 
     
    Noticeboard.find(serach)
        .then(noticeboard => {
            if (noticeboard.length <= 0) {
                return res.status(404).send({
                    message: "Noticeboard list Dtabase Empty "
                })
            }
            res.send({
                count: noticeboard.length,
                Noticeboard: noticeboard
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}