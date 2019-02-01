const HiringCompanise = require('../models/hiringcompanise.model');

//Post a HiringCompanise
exports.create = (req,res) =>{
    //Create a HiringCompanise 
    const hiringCompanises = new HiringCompanise({
        year:req.body.year,
        placement_type:req.body.placement_type,
        program:req.body.program,
        department:req.body.department,
        company:req.body.company,      
    })
    //Save HiringCompanise in Mogodb
    hiringCompanises.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all HiringCompanise
exports.findAll = (req,res)=>{
    HiringCompanise.find()
    .then(hiringCompanises => {
        if(hiringCompanises.length  <= 0){
            return  res.status(404).send({
                message:"HiringCompanises list Dtabase Empty "
            })
        }
        res.send({
            count: hiringCompanises.length,
            HiringCompanises:hiringCompanises
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a HiringCompanise
exports.findOne = (req, res) => {
    HiringCompanise.findById(req.params.hiringcompaniseId)
    .then(hiringcompanise=> {
        if(!hiringcompanise) {
            return res.status(404).send({
                message: "HiringCompanise not found with id " + req.params.hiringcompaniseId
            });            
        }
        res.send(hiringcompanise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "HiringCompanise not found with id " + req.params.hiringcompaniseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving HiringCompanise with id " + req.params.hiringcompaniseId
        });
    });
};

//Find Program Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('year')){
        if (req.query.year.length > 0) {
            serach.year = req.query.year;
        }
    }    
    if (req.query.hasOwnProperty('placement_type')) {
        if (req.query.placement_type.length > 0) {
            serach.placement_type = req.query.placement_type;
        }
    }
    if (req.query.hasOwnProperty('program')) {
        if (req.query.program.length > 0) {
            serach.program = req.query.program;
        }
    }
    if (req.query.hasOwnProperty('department')) {
        if (req.query.department.length > 0) {
            serach.department = req.query.department;
        }
    }
    if (req.query.hasOwnProperty('company')) {
        if (req.query.company.length > 0) {
            serach.company = req.query.company;
        }
    }
     
    HiringCompanise.find(serach)
        .then(hiringcompanise => {
            if (hiringcompanise.length <= 0) {
                return res.status(404).send({
                    message: "HiringCompanise list Dtabase Empty "
                })
            }
            res.send({
                count: hiringcompanise.length,
                HiringCompanise: hiringcompanise
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}