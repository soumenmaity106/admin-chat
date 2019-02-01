var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Hiringcompanise = require('../models/hiringcompanise.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Hiringcompanise.find(function (err,hiringcompanises) {
        res.render('admin/hiringcompanises', {
            hiringcompanises: hiringcompanises
        });
    });

});

// // Get Add Center
router.get('/add-hiringcompanises', isAdmin, function (req, res) {
    res.render('admin/add_hiringcompanises', {

    });
});

// // Post Add User
router.post('/add-hiringcompanises', function (req, res) {
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
            Hiringcompanise.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Facilitis added');
            res.redirect('/admin/hiringcompanises');
        });
})

//Get Edit Edit
router.get('/edit-hiringcompanises/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Hiringcompanise.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/hiringcompanises')
        } else {
            res.render('admin/edit_hiringcompanises', {
                errors: errors,
                year: p.year,
                placement_type: p.placement_type,
                program: p.program,
                department: p.department,
                company: p.company,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-hiringcompanises/:id', function (req, res) {    
    var year = req.body.year;
    var placement_type = req.body.placement_type;
    var program = req.body.program;
    var department = req.body.department;
    var company = req.body.company;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/hiringcompanise/edit-hiringcompanises/' + id);
    } else {
        Hiringcompanise.findById(id, function (err, p) {
            if (err) console.log(err);
            p.year = year;
            p.placement_type = placement_type;
            p.program = program;
            p.department = department;
            p.company = company;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Hiringcompanises Edited');
                res.redirect('/admin/hiringcompanise');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-hiringcompanises/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Hiringcompanise.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Hiringcompanises Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/hiringcompanise')
});

//Export
module.exports = router;

