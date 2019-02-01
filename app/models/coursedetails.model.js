const mongoose = require('mongoose');
const CourseDetailsSchema = mongoose.Schema({
    course_id: { type: String },
    course_name: { type: String, },
    course_fees: { type: String, },
    faculty_name: { type: String, },
    credits: { type: String, },
    prequisites: { type: String, }
})
module.exports = mongoose.model('CourseDetails', CourseDetailsSchema);