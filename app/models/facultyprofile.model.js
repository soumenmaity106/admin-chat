const mongoose = require('mongoose');
const facultyProfileSchema = mongoose.Schema({
    faculty_name: { type: String, required: true },
    faculty_profile: { type: String, },
})
module.exports = mongoose.model('FacultyProfile', facultyProfileSchema)