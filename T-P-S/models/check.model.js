const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let archiveSchema = new Schema({
    id: { type: Number },
    c_id: { type: Number },
    email: { type: String },
    phone: { type: Number },
    last_date: { type: String },
    last_feedback: { type: String }
})



module.exports = mongoose.model('Archive', archiveSchema);