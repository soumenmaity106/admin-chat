const Facilitis = require('../models/facilitis.model');

//Post a Facilitis
exports.create = (req,res) =>{
    //Create a Facilitis 
    const facilitis = new Facilitis({
        facility_type:req.body.facility_type,
        description:req.body.description,       
    })
    //Save Facilitis in Mogodb
    facilitis.save()
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
    Facilitis.find()
    .then(facilitis => {
        if(facilitis.length  <= 0){
            return  res.status(404).send({
                message:"facilitis list Dtabase Empty "
            })
        }
        res.send({
            count: facilitis.length,
            Facilitis:facilitis
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a facilitis
exports.findOne = (req, res) => {
    Facilitis.findById(req.params.facilitisId)
    .then(facilitis => {
        if(!facilitis) {
            return res.status(404).send({
                message: "Facilitis not found with id " + req.params.facilitisId
            });            
        }
        res.send(facilitis);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Facilitis not found with id " + req.params.facilitisId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving facilitis with id " + req.params.facilitisId
        });
    });
};

//Find Program Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('facility_type')){
        if (req.query.facility_type.length > 0) {
            serach.facility_type = req.query.facility_type;
        }
    }
    if(req.query.hasOwnProperty('description')){
        if (req.query.description.length > 0) {
            serach.description = req.query.description;
        }
    }    
   
     
    Facilitis.find(serach)
        .then(facilitis => {
            if (facilitis.length <= 0) {
                return res.status(404).send({
                    message: "Facilitis list Dtabase Empty "
                })
            }
            res.send({
                count: facilitis.length,
                Facilitis: facilitis
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}