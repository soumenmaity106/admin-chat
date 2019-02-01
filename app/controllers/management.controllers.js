const Management = require('../models/management.model');

//Post a Management
exports.create = (req,res) =>{
    //Create a Management 
    const management = new Management({
        name:req.body.name,
        role:req.body.role,
        department:req.body.department,
        profile:req.body.profile,
        profilelink:req.body.profilelink,
        profileimage:req.body.profileimage,       
    })
    //Save management in Mogodb
    management.save()
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
    Management.find()
    .then(management => {
        if(management.length  <= 0){
            return  res.status(404).send({
                message:"Management list Dtabase Empty "
            })
        }
        res.send({
            count: management.length,
            Management:management
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Management
exports.findOne = (req, res) => {
    Management.findById(req.params.managementId)
    .then(management => {
        if(!management) {
            return res.status(404).send({
                message: "Management not found with id " + req.params.managementId
            });            
        }
        res.send(management);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "management not found with id " + req.params.managementId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving facilitis with id " + req.params.managementId
        });
    });
};

//Find management Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('name')){
        if (req.query.name.length > 0) {
            serach.name = req.query.name;
        }
    }
    if(req.query.hasOwnProperty('role')){
        if (req.query.role.length > 0) {
            serach.role = req.query.role;
        }
    } 
    if(req.query.hasOwnProperty('department')){
        if (req.query.department.length > 0) {
            serach.department = req.query.department;
        }
    } 
    if(req.query.hasOwnProperty('profile')){
        if (req.query.profile.length > 0) {
            serach.profile = req.query.profile;
        }
    }  
    
    if(req.query.hasOwnProperty('profilelink')){
        if (req.query.profilelink.length > 0) {
            serach.profilelink = req.query.profilelink;
        }
    } 
    if(req.query.hasOwnProperty('profileimage')){
        if (req.query.profileimage.length > 0) {
            serach.profileimage = req.query.profileimage;
        }
    } 
   
     
    Management.find(serach)
        .then(management => {
            if (management.length <= 0) {
                return res.status(404).send({
                    message: "Management list Dtabase Empty "
                })
            }
            res.send({
                count: management.length,
                Management: management
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}