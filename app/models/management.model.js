const mongoose = require('mongoose');
const managementSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String,required: true},
    department:{ type: String,required: true},
    profile:{type: String,required: true},
    profilelink:{type: String,required: true},
    profileimage:{type: String,required: true}
})
module.exports = mongoose.model('Management', managementSchema)