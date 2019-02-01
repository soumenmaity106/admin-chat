var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var isAdmin = auth.isAdmin;

// Get Center model
var Management = require('../models/management.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Management.find(function (err, managements) {
        res.render('admin/management', {
            managements: managements
        });
    });

});

// // Get Add Center
router.get('/add-management', isAdmin, function (req, res) {
    res.render('admin/add_management', {

    });
});

// // Post Add User
router.post('/add-management', function (req, res) {
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
            Management.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Management added');
            res.redirect('/admin/management');
        });
})

//Get Edit Edit
router.get('/edit-management/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Management.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/management')
        } else {
            res.render('admin/edit_management', {
                errors: errors,
                name: p.name,
                role: p.role,
                department: p.department,
                profile: p.profile,
                profilelink: p.profilelink,
                profileimage: p.profileimage,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-management/:id', function (req, res) {    
    var name = req.body.name;
    var role = req.body.role;
    var department = req.body.department;
    var profile = req.body.profile;
    var profilelink = req.body.profilelink;
    var profileimage = req.body.profileimage;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/management/edit-management/' + id);
    } else {
        Management.findById(id, function (err, p) {
            if (err) console.log(err);
            p.name = name;
            p.role = role;
            p.department = department;
            p.profile = profile;
            p.profilelink = profilelink;
            p.profileimage = profileimage
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Management Edited');
                res.redirect('/admin/management');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-management/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Management.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Management Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/management')
});

//Export
module.exports = router;

