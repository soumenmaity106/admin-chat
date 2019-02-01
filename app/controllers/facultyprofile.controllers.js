const FacultyProfile = require('../models/facultyprofile.model');

//Post a FacultyProfile
exports.create = (req,res) =>{
    //Create a FacultyProfile 
    const facultyProfile = new FacultyProfile({
        faculty_name:req.body.faculty_name,
        faculty_profile:req.body.faculty_profile,       
    })
    //Save FacultyProfile in Mogodb
    facultyProfile.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all FacultyProfile
exports.findAll = (req,res)=>{
    FacultyProfile.find()
    .then(facultyProfile => {
        if(facultyProfile.length  <= 0){
            return  res.status(404).send({
                message:"FacultyProfile list Dtabase Empty "
            })
        }
        res.send({
            count: facultyProfile.length,
            FacultyProfile:facultyProfile
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a FacultyProfile
exports.findOne = (req, res) => {
    FacultyProfile.findById(req.params.facultyprofilesId)
    .then(facultyProfile => {
        if(!facultyProfile) {
            return res.status(404).send({
                message: "FacultyProfile not found with id " + req.params.facultyprofilesId
            });            
        }
        res.send(facultyProfile);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "FacultyProfile not found with id " + req.params.facultyprofilesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving FacultyProfile with id " + req.params.facultyprofilesId
        });
    });
};

//Find Program Serach
exports.search = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('faculty_name')){
        if (req.query.faculty_name.length > 0) {
            serach.faculty_name = req.query.faculty_name;
        }
    }   
    FacultyProfile.find(serach)
        .then(facultyprofile => {
            if (facultyprofile.length <= 0) {
                return res.status(404).send({
                    message: "facultyprofile Dtabase Empty "
                })
            }
            res.send({
                count: facultyprofile.length,
                facultyprofile: facultyprofile
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}