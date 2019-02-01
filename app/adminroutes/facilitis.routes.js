var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Facilitis = require('../models/facilitis.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Facilitis.find(function (err, facilitis) {
        res.render('admin/facilitis', {
            facilitis: facilitis
        });
    });

});

// // Get Add Center
router.get('/add-facilitis', isAdmin, function (req, res) {
    res.render('admin/add_faciliti', {

    });
});

// // Post Add User
router.post('/add-facilitis', function (req, res) {
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
            Facilitis.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Facilitis added');
            res.redirect('/admin/facilitis');
        });
})

//Get Edit Edit
router.get('/edit-facilitis/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Facilitis.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/facilitis')
        } else {
            res.render('admin/edit_faciliti', {
                errors: errors,
                facility_type: p.facility_type,
                description: p.description,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-facilitis/:id', function (req, res) {    
    var facility_type = req.body.facility_type;
    var description = req.body.description;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/facilitis/edit-facilitis/' + id);
    } else {
        Facilitis.findById(id, function (err, p) {
            if (err) console.log(err);
            p.facility_type = facility_type;
            p.description = description;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Faciliti Edited');
                res.redirect('/admin/facilitis');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-facilitis/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Facilitis.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Faciliti Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/facilitis')
});

//Export
module.exports = router;

