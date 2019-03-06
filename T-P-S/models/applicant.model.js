const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let applicantSchema = new Schema({
    fullName: { type: String, required : true },
    address:{type:String, required : true},
    city: { type: String, required : true },
    state: { type: String, required : true },
    zip: { type: String, required : true },
    email: { type: String, required : true },
    mobile: { type: String, required : true },
    highSchool: { type: String, required : true },
    cgpa: { type: String, required : true },
    xii: { type: String, required : true },
    perc: { type: String, required : true },
    hgd: { type: String, required : true ,enum : ['B.Tech','M.Tech','M.B.A','B.C.A','B.E']},
    gdate: { type: String, required : true },
    certifications: { type: String, required : true },
    skills: { type: String, required : true },
    year: { type: String, required : true },
    month: { type: String, required : true },
    employer: { type: String },
    empadd: { type: String },
    Eemail: { type: String },
    Ephone: { type: String },
    supervisor: { type: String },
    jtitle: { type: String },
    salary: { type: String },
    ehdate: { type: String },
    rfl: { type: String },
    refname: { type: String , required : true},
    refjob: { type: String, required : true },
    refcomp: { type: String , required : true},
    refphone: { type: String, required : true },
    refemail: { type: String, required : true },
    resFile: { type: String, required : true },
    vidFile: { type: String, required : true },
    applyFor: [
        {
            jobCode: {type:String, required : true},
            j_id:{type:String, required : true}
        }
    ],
    isVerified:{type:String}
})



module.exports = mongoose.model('Applicant', applicantSchema);