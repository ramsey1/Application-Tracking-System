const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let jobSchema = new Schema({
    job_code: { type: String ,required:true,unique: true},
    job_profile: { type: String ,required:true},
    jod_description: { type: String,required:true },
    vacancies: { type: Number ,required:true},
    base_sal: { type: String ,required:true},
    enrollment_type: { type: String ,required:true},
    experience_req: { type: String ,required:true},
    job_location: { type: String ,required:true},
    skills_req: { type: String ,required:true},
    educational_req: { type: String ,required:true},
    aplied_cnt: { type: Number ,default :0},
    is_active: { type: Boolean ,default : true},
    priority: {type: Boolean},
    adminInfo:{type:String}
})



module.exports = mongoose.model('Job', jobSchema);