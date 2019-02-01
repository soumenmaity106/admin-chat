var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get newUser model
var Facultyprofiles = require('../models/facultyprofile.model');

// Get User Index

router.get('/', isAdmin, function (req, res) {   
    Facultyprofiles.find(function (err, facultyprofiles) {
        res.render('admin/facultyprofiles', {
            facultyprofiles: facultyprofiles           
        });
    });

});

// // Get Add User
router.get('/add-facultyprofiles', isAdmin, function (req, res) {
    res.render('admin/add_facultyprofiles', {

    });
});

// // Post Add User
router.post('/add-facultyprofiles', function (req, res) {
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
            Facultyprofiles.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Facultyprofiles added');
            res.redirect('/admin/facultyprofiles');
        });
})

// //Get Edit User

router.get('/edit-facultyprofiles/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Facultyprofiles.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/facultyprofiles')
        } else {
            res.render('admin/edit_facultyprofiles', {
                faculty_name: p.faculty_name,
                faculty_profile: p.faculty_profile,                
                id: p._id
            });
        }
    });


});

// Post Edit User

router.post('/edit-facultyprofiles/:id', function (req, res) {
    var faculty_name = req.body.faculty_name;
    var faculty_profile = req.body.faculty_profile;    
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/facultyprofiles/edit-facultyprofiles/' + id);
    } else {
        Facultyprofiles.findById(id, function (err, p) {
            if (err) console.log(err);
            p.faculty_name = faculty_name;
            p.faculty_profile = faculty_profile;
            
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Facultyprofile Edited');
                res.redirect('/admin/facultyprofiles');
            })

        });
    }
});

// Get Delete user 

router.get('/delete-facultyprofiles/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Facultyprofiles.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Facultyprofiles Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/facultyprofiles')
});

//Export
module.exports = router;

