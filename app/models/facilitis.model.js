const mongoose = require('mongoose');
const facilitisSchema = mongoose.Schema({
    facility_type: { type: String},
    description: { type: String},
})
module.exports = mongoose.model('Facilitis', facilitisSchema)