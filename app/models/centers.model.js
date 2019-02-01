const mongoose = require('mongoose');
const CentersSchema = mongoose.Schema({
    branch_name: { type: String, },
    address: { type: String,},
    location: { type: String,},
    city: { type: String,},
    state: { type: String,},
    country: { type: String,},
    zip_code: { type: String,},
})
module.exports = mongoose.model('Centers', CentersSchema)