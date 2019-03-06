const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let interviewerSchema = new Schema({
    name: {type: String, required : true},
    email: {type: String, required : true},
    password: {type: String, required : true},
    role: {type: String, required : true},
    isAvailable: [],
    isActive:{type:Boolean,default:true},
    adminInfo:{type : String}
});

module.exports = mongoose.model('Interviewer', interviewerSchema);