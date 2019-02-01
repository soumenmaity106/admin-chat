var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Programslist = require('../models/programslist.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Programslist.find(function (err, programslists) {
        res.render('admin/programslist', {
            programslists: programslists
        });
    });

});

// // Get Add Center
router.get('/add-programslist', isAdmin, function (req, res) {
    res.render('admin/add_programslist', {

    });
});

// // Post Add User
router.post('/add-programslist', function (req, res) {
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
            Programslist.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Programslist added');
            res.redirect('/admin/programslist');
        });
})

//Get Edit Edit
router.get('/edit-programslist/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Programslist.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/programslist')
        } else {
            res.render('admin/edit_programslist', {
                sno: p.sno,
                errors: errors,
                program: p.program,
                department: p.department,                 
                id: p._id
            });
        }
    });


});

// Post Edit Center

router.post('/edit-programslist/:id', function (req, res) {
    var sno = req.body.sno;
    var program = req.body.program;
    var department = req.body.department;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/programslist/edit-programslist/' + id);
    } else {
        Programslist.findById(id, function (err, p) {
            if (err) console.log(err);
            p.sno = sno;
            p.program = program;
            p.department = department;           
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Programslist Edited');
                res.redirect('/admin/programslist');
            })

        });
    }
});

// Get Delete user 

router.get('/delete-programslist/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Programslist.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Programslist Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/programslist')
});

//Export
module.exports = router;

