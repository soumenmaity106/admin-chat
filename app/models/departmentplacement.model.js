const mongoose = require('mongoose');
const DepartmentPlacementSchema = mongoose.Schema({
    year: { type: Number},
    placement_type: { type: String},
    program:{ type: String },
    department:{type: String},
    comments: { type: String},
})
module.exports = mongoose.model('DepartmentPlacements', DepartmentPlacementSchema)