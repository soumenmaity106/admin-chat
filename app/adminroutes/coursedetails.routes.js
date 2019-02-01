var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Coursedetail = require('../models/coursedetails.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Coursedetail.find(function (err, coursedetails) {
        res.render('admin/coursedetail', {
            coursedetails: coursedetails
        });
    });

});

// // Get Add Center
router.get('/add-coursedetail', isAdmin, function (req, res) {
    res.render('admin/add_coursedetail', {

    });
});

// // Post Add User
router.post('/add-coursedetail', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    var authorFile = req.files.file;

    var authors = [];
    csv
        .fromString(authorFile.data.toString(), {
            headers: true,
            ignoreEmpty: true
        })
        .on("data", function (data) {
            data['_id'] = new mongoose.Types.ObjectId();

            authors.push(data);
        })
        .on("end", function () {
            Coursedetail.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Coursedetail added');
            res.redirect('/admin/coursedetail');
        });
})

//Get Edit Edit
router.get('/edit-coursedetail/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Coursedetail.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/coursedetail')
        } else {
            res.render('admin/edit_coursedetail', {
                coursedetail_id: p.coursedetail_id,
                errors: errors,
                course_id: p.course_id,
                course_name: p.course_name,
                course_fees: p.course_fees,
                faculty_name: p.faculty_name,
                credits: p.credits,
                prequisites: p.prequisites,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-coursedetail/:id', function (req, res) {    
    var course_id = req.body.course_id;
    var course_name = req.body.course_name;
    var course_fees = req.body.course_fees;
    var faculty_name = req.body.faculty_name;
    var credits = req.body.credits;
    var prequisites = req.body.prequisites;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/coursedetail/edit-coursedetail/' + id);
    } else {
        Coursedetail.findById(id, function (err, p) {
            if (err) console.log(err);
            p.course_id = course_id;
            p.course_name = course_name;
            p.course_fees = course_fees;
            p.faculty_name = faculty_name;
            p.credits = credits;
            p.prequisites = prequisites;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Coursedetail Edited');
                res.redirect('/admin/coursedetail');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-coursedetail/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Coursedetail.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Coursedetail Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/coursedetail')
});

//Export
module.exports = router;

