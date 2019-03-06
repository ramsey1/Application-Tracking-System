const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let assignSchema = new Schema({
    c_id: { type: String },
    c_email:{type: String, required : true},
    c_name:{type : String},
    i_email:{type : String, required : true},
    i_name:{type: String},
    j_id: { type: String , required : true},
    i_id: { type: String },
    j_code:{type:String, required : true},
    level:{type:String,default : "Level 1"},
    date: { type: String , required : true},
    time: { type: String , required : true},
    feedback: { type: Number, default : -1 },
    status: { type: String },
    comments:{type:String},
    isSubmitted: {type : Boolean,default:false},
    isCompleted:{type: Boolean,default:false}
})



module.exports = mongoose.model('Assign', assignSchema);