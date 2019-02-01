var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Departmentplacements = require('../models/departmentplacement.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {

    Departmentplacements.find(function (err, departmentplacements) {
        res.render('admin/departmentplacements', {
            departmentplacements: departmentplacements
        });
    });

});

// // Get Add Center
router.get('/add-departmentplacements', isAdmin, function (req, res) {
    res.render('admin/add_departmentplacements', {

    });
});

// // Post Add User
router.post('/add-departmentplacements', function (req, res) {
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
            Departmentplacements.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Departmentplacements added');
            res.redirect('/admin/departmentplacements');
        });
})

//Get Edit Edit
router.get('/edit-departmentplacements/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Departmentplacements.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/departmentplacements')
        } else {
            res.render('admin/edit_departmentplacements', {
                departmentplacements_id: p.departmentplacements_id,
                errors: errors,
                year: p.year,
                placement_type: p.placement_type,
                program: p.program,
                department: p.department,
                comments: p.comments,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-departmentplacements/:id', function (req, res) {

    var year = req.body.year;
    var placement_type = req.body.placement_type;
    var program = req.body.program;
    var department = req.body.department;
    var comments = req.body.comments;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/departmentplacements/edit-departmentplacements/' + id);
    } else {
        Departmentplacements.findById(id, function (err, p) {
            if (err) console.log(err);
            p.year = year;
            p.placement_type = placement_type;
            p.program = program;
            p.department = department;
            p.comments = comments;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Departmentplacements Edited');
                res.redirect('/admin/departmentplacements');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-departmentplacements/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Departmentplacements.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Departmentplacements Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/departmentplacements')
});

//Export
module.exports = router;

