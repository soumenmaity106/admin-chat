var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Placement = require('../models/placement.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {

    Placement.find(function (err, placements) {
        res.render('admin/placement', {
            placements: placements
        });
    });

});

// // Get Add Center
router.get('/add-placement', isAdmin, function (req, res) {
    res.render('admin/add_placement', {

    });
});

// // Post Add User
router.post('/add-placement', function (req, res) {
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
            Placement.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Placement added');
            res.redirect('/admin/placement');
        });
})

//Get Edit Edit
router.get('/edit-placement/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Placement.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/placement')
        } else {
            res.render('admin/edit_placement', {
                errors: errors,
                sno: p.sno,
                year: p.year,
                placement_type: p.placement_type,
                program: p.program,
                department: p.department,
                placed: p.placed,
                highest_salary: p.highest_salary,
                median_salary: p.median_salary,
                averag_salary: p.averag_salary,
                comments: p.comments,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-placement/:id', function (req, res) {
    var sno = req.body.sno;
    var year = req.body.year;
    var placement_type = req.body.placement_type;
    var program = req.body.program;
    var department = req.body.department;
    var placed = req.body.placed;
    var highest_salary = req.body.highest_salary;
    var median_salary = req.body.median_salary;
    var averag_salary = req.body.averag_salary;
    var comments = req.body.comments;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/placement/edit-placement/' + id);
    } else {
        Placement.findById(id, function (err, p) {
            if (err) console.log(err);
            p.sno = sno;
            p.year = year;
            p.placement_type = placement_type;
            p.program = program;
            p.department = department;
            p.placed = placed;
            p.highest_salary = highest_salary;
            p.median_salary = median_salary;
            p.averag_salary = averag_salary;
            p.comments = comments;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Placement Edited');
                res.redirect('/admin/placement');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-placement/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Placement.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Placement Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/placement')
});

//Export
module.exports = router;

