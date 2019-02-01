const mongoose = require('mongoose');
const PlacementSchema = mongoose.Schema({
    sno:{ type: String },
    year: { type: Number},
    placement_type: { type: String},
    program:{ type: String},
    department: { type: String},    
    placed: { type: String},
    highest_salary: { type: String},
    median_salary: { type: String},
    averag_salary: { type: String},
    comments: { type: String, },
})
module.exports = mongoose.model('Placements', PlacementSchema)