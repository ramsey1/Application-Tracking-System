const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let verificationSchema = new Schema({
    token: { type: String ,required:true},
    expiring_time: { type: String },
    u_email: { type: String ,required:true},
    is_active: { type: Boolean }
})



module.exports = mongoose.model('Verification', verificationSchema);