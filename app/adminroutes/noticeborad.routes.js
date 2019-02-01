var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var csv = require('fast-csv');
var mongoose = require('mongoose');

var isAdmin = auth.isAdmin;

// Get Center model
var Noticeborad = require('../models/noticeborad.model');

// Get Center Index
router.get('/', isAdmin, function (req, res) {

    Noticeborad.find(function (err, noticeborads) {
        res.render('admin/noticeborad', {
            noticeborads: noticeborads
        });
    });

});

// // Get Add Center
router.get('/add-noticeborad', isAdmin, function (req, res) {
    res.render('admin/add_noticeborad', {

    });
});

// // Post Add User
router.post('/add-noticeborad', function (req, res) {
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
            Noticeborad.create(authors, function (err, documents) {
                if (err) throw err;
            });

            req.flash('success', 'Noticeborad added');
            res.redirect('/admin/noticeborad');
        });
})

//Get Edit Edit
router.get('/edit-noticeborad/:id', isAdmin, function (req, res) {
    var errors;
    if (req.session.errors)
        errors = req.session.errors;

    req.session.errors = null;

    Noticeborad.findById(req.params.id, function (err, p) {
        if (err) {
            console.log(err);
            res.redirect('/admin/noticeborad')
        } else {
            res.render('admin/edit_noticeborad', {
                errors: errors,
                date: p.date,
                newstype: p.newstype,
                newsText: p.newsText,
                details: p.details,
                id: p._id
            });
        }
    });


});

// Post Edit Coursedetail

router.post('/edit-noticeborad/:id', function (req, res) {
    var date = req.body.date;
    var newstype = req.body.newstype;
    var newsText = req.body.newsText;
    var details = req.body.details;
    var id = req.params.id;
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect('/admin/facilitis/edit-noticeborad/' + id);
    } else {
        Noticeborad.findById(id, function (err, p) {
            if (err) console.log(err);
            p.date = date;
            p.newstype = newstype;
            p.newsText = newsText;
            p.details = details;
            p.save(function (err) {
                if (err) console.log(err)
                req.flash('success', 'Noticeborad Edited');
                res.redirect('/admin/noticeborad');
            })

        });
    }
});

// Get Delete coursedetail 

router.get('/delete-noticeborad/:id', isAdmin, function (req, res) {
    var id = req.params.id;
    Noticeborad.findByIdAndDelete(id, function (err) {

    })
        .then(
            req.flash('success', 'Noticeborad Deleted')
        )
        .catch(err => {
            res.status(500).send({
                error: err
            })
        })
    res.redirect('/admin/noticeborad')
});

//Export
module.exports = router;

