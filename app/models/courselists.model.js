var mongoose = require('mongoose');
var courseSchema = mongoose.Schema({
    sno: { type: String,  },
    program: { type: String,  },
    department: { type: String,  },
    courseid: { type: String, },
    coursename: { type: String,  },
    coursetype: { type: String, },
    duration: { type: String,  },
    degreecertificatname: { type: String,  },
    degreeawardedby: { type: String,  },
    availabilitycampus: [String],
    elligibility: { type: String,  },
    coursebrochure: {type: String, },
    link: { type: String, }
});
var Course = mongoose.model('CourseLists', courseSchema);
module.exports = Course;