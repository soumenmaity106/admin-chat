const mongoose = require('mongoose');
const noticeboardSchema = mongoose.Schema({
    date: { type: String, required: true },
    newstype: { type: String, required: true},
    newsText:{ type: String, required: true},
    details:{ type: String, required: true}
})
module.exports = mongoose.model('Noticeboard', noticeboardSchema)