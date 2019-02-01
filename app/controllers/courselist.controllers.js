const CourseList = require('../models/courselists.model');

//Post a CourseList
exports.create = (req, res) => {
    //Create a CourseList 
    const courselist = new CourseList({
        sno: req.body.sno,
        program: req.body.program,
        department: req.body.department,
        courseid: req.body.courseid,
        coursename: req.body.coursename,
        coursetype:req.body.coursetype,
        duration:req.body.duration,
        degreecertificatname:req.body.degreecertificatname,
        degreeawardedby:req.body.degreeawardedby,
        availabilitycampus:req.body.availabilitycampus,
        elligibility:req.body.elligibility,
        link:req.body.link
    })
    //Save CourseList in Mogodb
    courselist.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// FETCH all CourseList
exports.findAll = (req, res) => {
    CourseList.find()
        .then(courselists => {
            if (courselists.length <= 0) {
                return res.status(404).send({
                    message: "Course list Dtabase Empty "
                })
            }
            res.send({
                count: courselists.length,
                Courselists: courselists
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// FIND a Courselist
exports.findOne = (req, res) => {
    CourseList.findById(req.params.courselistId)
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "Courselist not found with id " + req.params.courselistId
                });
            }
            res.send(courselist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Courselist not found with id " + req.params.courselistId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Courselist with id " + req.params.courselistId
            });
        });
};

//Update Courselist
exports.update = (req, res) => {
    //Find Course Id and update it
    CourseList.findByIdAndUpdate(req.params.courselistId,
        {
            sno: req.body.sno,
            program: req.body.program,
            department: req.body.department,
            courseid: req.body.courseid,
            coursename: req.body.coursename
        },
        { new: true })
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "CourseList not found by Id " + req.params.courselistId
                });
            }
            res.send(courselist)
        })
        .catch(err => {
            if (err.kind === 'ObjectID') {
                return res.status(404).send({
                    message: "CourseList not found by Id" + req.params.courselistId
                })
            }
            return res.status(5000).send({
                message: "Error updating CourseList by Id" + req.params.courselistId
            })
        })
}

//Couselist Delete by ID
exports.delete = (req, res) => {
    CourseList.findByIdAndRemove(req.params.courselistId)
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "CourseList not found by Id" + req.params.courselistId
                });
            }
            res.send({ message: "CourseList deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseList not found with id " + req.params.courselistId
                });
            }
            return res.status(500).send({
                message: "CourseList not delete customer with id " + req.params.courselistId
            });
        });
}

//Couselist Serach
exports.serach = (req, res) => {       
    var findCourseList = {};
    if(req.query.hasOwnProperty('program')){
        if (req.query.program.length > 0) {
            findCourseList.program = req.query.program;
        }
    }    
    if (req.query.hasOwnProperty('department')) {
        if (req.query.department.length > 0) {
            findCourseList.department = req.query.department;
        }
    }
    if (req.query.hasOwnProperty('coursename')) {
        if (req.query.coursename.length > 0) {
            findCourseList.coursename = req.query.coursename
        }
    } 
    if (req.query.hasOwnProperty('coursetype')) {
        if (req.query.coursetype.length > 0) {
            findCourseList.coursetype = req.query.coursetype
        }
    }
    if (req.query.hasOwnProperty('duration')) {
        if (req.query.duration.length > 0) {
            findCourseList.duration = req.query.duration
        }
    }
    if (req.query.hasOwnProperty('degreeawardedby')) {
        if (req.query.degreeawardedby.length > 0) {
            findCourseList.degreeawardedby = req.query.degreeawardedby
        }
    }
    if (req.query.hasOwnProperty('degreecertificatname')) {
        if (req.query.degreecertificatname.length > 0) {
            findCourseList.degreecertificatname = req.query.degreecertificatname
        }
    }
    if (req.query.hasOwnProperty('degreeawardedby')) {
        if (req.query.degreeawardedby.length > 0) {
            findCourseList.degreeawardedby = req.query.degreeawardedby
        }
    }
    if (req.query.hasOwnProperty('availabilitycampus')) {
        if (req.query.availabilitycampus.length > 0) {
            findCourseList.availabilitycampus = req.query.availabilitycampus
        }
    }   
    CourseList.find(findCourseList)
        .then(courselists => {
            if (courselists.length <= 0) {
                return res.status(404).send({
                    message: "Course list Dtabase Not Match "
                })
            }
            res.send({
                count: courselists.length,
                Courselists: courselists
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}