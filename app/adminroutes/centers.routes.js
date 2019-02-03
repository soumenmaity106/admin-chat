var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Center = require('../models/centers.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {
    
    Center.find(function (err, centers) {
        res.render('admin/center', {
            centers: centers
        });
    });

});

// // Get Add Center
router.get('/add-center', isAdmin, function (req, res) {
    res.render('admin/add_center', {

    });
});

// // Post Add User
router.post('/add-center', function (req, res) {
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
            Center.create(authors, function (err, documents) {
                if (err) throw err;
            });
            
            req.flash('success', 'Center added');
            res.redirect('/admin/center');
        });
})

//Get Edit Edit
router.get('/edit-center/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Center.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/center')
        } else {
            res.render('admin/edit_center', {
                center_id: p.center_id,
                errors: errors,
                branch_name: p.branch_name,
                address: p.address,
                location: p.location,
                city: p.city,
                state: p.state,
                country: p.country,
                zip_code: p.zip_code,
                id: p._id
            });
        }
    });


});

// Post Edit Center

router.post('/edit-center/:id', function (req, res) {
    var center_id = req.body.center_id;
    var branch_name = req.body.branch_name;
    var address = req.body.address;
    var location = req.body.location;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var zip_code = req.body.zip_code;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/center/edit-center/' + id);
    } else {
        Center.findById(id, function (err, p) {
            if (err) console.log(err);
            p.center_id = center_id;
            p.branch_name = branch_name;
            p.address = address;
            p.location = location;
            p.city = city;
            p.state = state;
            p.country = country;
            p.zip_code = zip_code;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Center Edited');
                res.redirect('/admin/center');
            })

        });
    }
});

// Get Delete user 

router.get('/delete-center/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Center.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Center Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/center')
});

//Export
module.exports = router;

