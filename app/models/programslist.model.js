const mongoose = require('mongoose');
const ProgramsListSchema = mongoose.Schema({
    sno: { type: Number },
    program: { type: String },
    department: { type: String },
})
module.exports = mongoose.model('ProgramsLists', ProgramsListSchema)