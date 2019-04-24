const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let sessionSchema = new Schema({
    u_email: {type: String,required:true},
    token: { type: String,required:true },
    platform: { type: String },
    ip_add: { type: String },
    date: { type: String },
    login_time: { type: String },
    is_active: { type: Boolean }
})

module.exports = mongoose.model('Session', sessionSchema);