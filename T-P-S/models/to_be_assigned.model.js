const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let toBeAssignSchema = new Schema({
   
    c_id: { type: String },
    c_email:{type: String},
    j_id: { type: String },
    j_code:{type: String},
    is_assigned: { type: Boolean, default : false},
    complete: { type: Boolean, default : false }
})

module.exports = mongoose.model('ToBeAssign', toBeAssignSchema);