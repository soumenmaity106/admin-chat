var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs');
var resizeImg = require('resize-img');
var auth = require('../config/auth');
var csv = require("fast-csv");
var mongoose = require('mongoose');
var multer = require('multer')
var isAdmin = auth.isAdmin;

// Get newUser model
var Courses = require('../models/courselists.model');
//var cv = require('../../uploads')
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })


// Get User Index
router.get('/', isAdmin, function (req, res) {


    Courses.find(function (err, courses) {
        res.render('admin/courselists', {
            courses: courses
        });
    });

});

// // Get Add User
router.get('/add-courselist', isAdmin, function (req, res) {
    res.render('admin/add_courselists', {

    });
});

// // Post Add User
router.post('/add-courselist', upload.single('myFile'), (req, res, next) => {
    var file = req.file.path

    // res.send(file)
    // console.log(file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    fs.exists(file, function (exists) {

        if (exists) {//test make sure the file exists
            var stream = fs.createReadStream(file);
            csv.fromStream(stream, {
                headers: ["sno","program","department","courseid","coursename","coursetype","duration","degreecertificatname","degreeawardedby","availabilitycampus","elligibility","coursebrochure","link"
                ],
                ignoreEmpty: true
            })
                .on("data", function (data) {
                    var corselist = new Courses();
                    corselist.sno = data['0'];
                    corselist.program = data['1'];
                    corselist.department = data['2'];
                    corselist.courseid = data['3'];
                    corselist.coursename = data['4'];
                    corselist.coursetype = data['5'];
                    corselist.duration = data['6'];
                    corselist.degreecertificatname = data['7'];
                    corselist.degreeawardedby = data['8'];
                    corselist.availabilitycampus = data['9'];
                    corselist.elligibility = data['10'];
                    corselist.coursebrochure = data['11'];
                    corselist.link = data['12'];

                    corselist.save(function (err, data) {
                        if (err) console.log(err);
                        else {
                            req.flash('success', 'Courselist Upload');
                            res.redirect('/admin/courselist');
                        }
                    });
                })

        }
    })

})

// //Get Edit User

router.get('/edit-courselist/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Courses.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/courselist')
        } else {
            res.render('admin/edit_courselist', {
                course_id: p.course_id,
                errors: errors,
                program: p.program,
                department: p.department,
                courseid: p.courseid,
                coursename: p.coursename,
                coursetype: p.coursetype,
                duration: p.duration,
                degreecertificatname: p.degreecertificatname,
                degreeawardedby: p.degreeawardedby,
                availabilitycampus: p.availabilitycampus,
                elligibility: p.elligibility,
                coursebrochure: p.coursebrochure,
                link: p.link,
                id: p._id
            });
        }
    });


});

// Post Edit User

router.post('/edit-courselist/:id', function (req, res) {
    var course_id = req.body.course_id;
    var program = req.body.program;
    var department = req.body.department;
    var courseid = req.body.courseid;
    var coursename = req.body.coursename;
    var coursetype = req.body.coursetype;
    var duration = req.body.duration;
    var degreecertificatname = req.body.degreecertificatname;
    var degreeawardedby = req.body.degreeawardedby;
    var availabilitycampus = req.body.availabilitycampus;
    var elligibility = req.body.elligibility;
    var coursebrochure = req.body.coursebrochure;
    var link = req.body.link;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/courselist/edit-courselist/' + id);
    } else {
        Courses.findById(id, function (err, p) {
            if (err) console.log(err);
            p.course_id = course_id;
            p.program = program;
            p.department = department;
            p.courseid = courseid;
            p.coursename = coursename;
            p.coursetype = coursetype;
            p.duration = duration;
            p.degreecertificatname = degreecertificatname;
            p.degreeawardedby = degreeawardedby;
            p.availabilitycampus = availabilitycampus;
            p.elligibility = elligibility;
            p.coursebrochure = coursebrochure;
            p.link = link;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Courselist Edited');
                res.redirect('/admin/courselist');
            })

        });
    }
});

// Get Delete user 

router.get('/delete-courselist/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Courses.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Courselist Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/courselist')
});

//Export
module.exports = router;

