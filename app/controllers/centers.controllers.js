const Centers = require('../models/centers.model');

//Post a Centers
exports.create = (req,res) =>{
    //Create a Centers 
    const centers = new Centers({
        branch_name:req.body.branch_name,
        address:req.body.address,
        location:req.body.location,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        zip_code:req.body.zip_code       
    })
    //Save Centers in Mogodb
    centers.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all Centers
exports.findAll = (req,res)=>{
    Centers.find()
    .then(centers => {
        if(centers.length  <= 0){
            return  res.status(404).send({
                message:"Centers list Dtabase Empty "
            })
        }
        res.send({
            count: centers.length,
            Centers:centers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Centers
exports.findOne = (req, res) => {
    Centers.findById(req.params.centersId)
    .then(centers => {
        if(!centers) {
            return res.status(404).send({
                message: "Centers not found with id " + req.params.centersId
            });            
        }
        res.send(centers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Centers not found with id " + req.params.centersId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving centers with id " + req.params.centersId
        });
    });
};

//Find centers Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('branch_name')){
        if (req.query.branch_name.length > 0) {
            serach.branch_name = req.query.branch_name;
        }
    }    
    if (req.query.hasOwnProperty('city')) {
        if (req.query.city.length > 0) {
            serach.city = req.query.city;
        }
    }
    if (req.query.hasOwnProperty('state')) {
        if (req.query.state.length > 0) {
            serach.state = req.query.state;
        }
    } 
    if (req.query.hasOwnProperty('country')) {
        if (req.query.country.length > 0) {
            serach.country = req.query.country;
        }
    } 
    if (req.query.hasOwnProperty('zip_code')) {
        if (req.query.zip_code.length > 0) {
            serach.zip_code = req.query.zip_code;
        }
    } 
    
    Centers.find(serach)
        .then(centers => {
            if (centers.length <= 0) {
                return res.status(404).send({
                    message: "centers Dtabase Empty "
                })
            }
            res.send({
                count: centers.length,
                Centers: centers
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}