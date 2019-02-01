const Registration = require('../models/registration.model');

//const CheckAuth = require('../middleware/check-auth');

//Post a Registration
exports.create = (req, res) => {
    //Create a Registration 
    var d = new Date();
    var n = d.getTime();
    const registration = new Registration({
        program:req.body.program,
        coursename: req.body.coursename,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        zipcode: req.body.zipcode,
        state:req.body.state,
        city:req.body.city,
        dob: req.body.dob,
        qualifications: req.body.qualifications,
        phone: req.body.phone,
        email: req.body.email,
        confirmationid: n
    })
    //Save Registration in Mogodb
    registration.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// FETCH all Registration
exports.findAll = (req, res) => {
    Registration.find()
        .then(registrations => {
            if (registrations.length <= 0) {
                return res.status(404).send({
                    message: "Registrations Dtabase Empty "
                })
            }
            res.send({
                count: registrations.length,
                Registrations: registrations
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// FIND a Registration
exports.findOne = (req, res) => {
    Registration.findById(req.params.registrationId)
        .then(registration => {
            if (!registration) {
                return res.status(404).send({
                    message: "Registration not found with id " + req.params.registrationId
                });
            }
            res.send(registration);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Registration not found with id " + req.params.registrationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Registration with id " + req.params.registrationId
            });
        });
};

