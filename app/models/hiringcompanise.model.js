const mongoose = require('mongoose');
const HiringCompaniseSchema = mongoose.Schema({
    year: { type: String, required: true },
    placement_type: { type: String, required: true },
    program: { type: String, required: true },
    department: { type: String, required: true },
    company: { type: String, required: true },
})
module.exports = mongoose.model('HiringCompanise', HiringCompaniseSchema)