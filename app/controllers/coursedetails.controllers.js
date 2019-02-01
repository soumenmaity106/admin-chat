const CourseDetails = require('../models/coursedetails.model');

//Post a CourseDetails
exports.create = (req,res) =>{
    //Create a CourseDetails 
    const coursedetails = new CourseDetails({
        course_id:req.body.course_id,
        course_name:req.body.course_name,
        course_fees:req.body.course_fees,
        faculty_name:req.body.faculty_name,
        credits:req.body.credits,
        prequisites:req.body.prequisites,
    })
    //Save CourseDetails in Mogodb
    coursedetails.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all CourseDetails
exports.findAll = (req,res)=>{
    CourseDetails.find()
    .then(coursedetails => {
        if(coursedetails.length  <= 0){
            return  res.status(404).send({
                message:"Centers list Dtabase Empty "
            })
        }
        res.send({
            count:coursedetails.length,
            CourseDetails:coursedetails
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it    
    CourseDetails.findByIdAndUpdate(req.params.coursedetailsId, {
        course_id:req.body.course_id,
        course_name:req.body.course_name,
        course_fees:req.body.course_fees,
        faculty_name:req.body.faculty_name,
        credits:req.body.credits,
        prequisites:req.body.prequisites,
    }, {new: true})
    .then(coursedetails => {
        if(!coursedetails) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.coursedetailsId
            });
        }
        res.send(coursedetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.coursedetailsId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.coursedetailsId
        });
    });
};

//FIND a CourseDetails
exports.findOne = (req, res) => {
    CourseDetails.findById(req.params.coursedetailsId)
    .then(coursedetails => {
        if(!coursedetails) {
            return res.status(404).send({
                message: "Coursedetails not found with id " + req.params.coursedetailsId
            });            
        }
        res.send(coursedetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Coursedetails not found with id " + req.params.coursedetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Coursedetails with id " + req.params.coursedetailsId
        });
    });
};

//Find Program Serach
exports.serach = (req, res) => {       
    var serach = {};
    if(req.query.hasOwnProperty('course_id')){
        if (req.query.course_id.length > 0) {
            serach.course_id = req.query.course_id;
        }
    }    
    if (req.query.hasOwnProperty('course_name')) {
        if (req.query.course_name.length > 0) {
            serach.course_name = req.query.course_name;
        }
    }
    if (req.query.hasOwnProperty('course_fees')) {
        if (req.query.course_fees.length > 0) {
            serach.course_fees = req.query.course_fees;
        }
    } 
    if (req.query.hasOwnProperty('faculty_name')) {
        if (req.query.faculty_name.length > 0) {
            serach.faculty_name = req.query.faculty_name;
        }
    } 
    if (req.query.hasOwnProperty('credits')) {
        if (req.query.credits.length > 0) {
            serach.credits = req.query.credits;
        }
    } 
    if (req.query.hasOwnProperty('prequisites')) {
        if (req.query.prequisites.length > 0) {
            serach.prequisites = req.query.prequisites;
        }
    }    
     
    CourseDetails.find(serach)
        .then(coursedetails => {
            if (coursedetails.length <= 0) {
                return res.status(404).send({
                    message: "Coursedetails Dtabase Empty "
                })
            }
            res.send({
                count: coursedetails.length,
                coursedetails: coursedetails
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}