const Jobs = require('../models/job.model');

function jobPost(req, res) {

    Jobs.findOne({ job_code: req.body.jobCode }, (err, job) => {
        if (job) {
            // res.send('already exist');
            res.json({'msgex': 'Job already exixts'});
            return;
        }

        else {
            let jobs = new Jobs({
                job_code: req.body.jobCode,
                job_profile: req.body.jobProfile,
                jod_description: req.body.jobDesc,
                vacancies: req.body.vacancies,
                base_sal: req.body.baseSal,
                enrollment_type: req.body.enrollType,
                experience_req: req.body.expReq,
                job_location: req.body.jobLoc,
                skills_req: req.body.skillsReq,
                educational_req: req.body.eductReq,
                priority: req.body.priority,
                is_active: req.body.isActive,
                adminInfo: req.body.adminInfo
            });

            jobs.save((err) => {
                if (err)
                    console.log('Job Post Error ->', err);
                else
                    // res.send(req.body);
                    res.json({'msg': 'Job posted sucessfully'});
            });
        }


    });

    console.log('check');


}

function getJobs(req, res) {
    Jobs.find({}).then((jobs) => {
        console.log(jobs);
        var jobsToSent= new Array;

        for(var i=0;i<jobs.length;i++){
            if(jobs[i].is_active){
                jobsToSent.push(jobs[i]);
            }
        }

        console.log(jobsToSent);
        
        
        res.send(jobsToSent);
    });
}

function getAll(req,res){
    Jobs.find({}).then((jobs)=>{
        res.send(jobs);
    })
}

function updateJobs(req, res) {
    Jobs.findOneAndUpdate({ _id: req.body._id }, {
        aplied_cnt: req.body.aplied_cnt
    }).then((job) => {
        res.json({'msg':'updated'});
    })
}

function softDeleteJobs(req,res){
    console.log(req.body);
    
    // Jobs.findOneAndUpdate({ _id: req.body._id }, {
    //     is_active:false
    // }).then((job) => {
    //     res.json({'msg':'removed'});
    // })
    Jobs.findOneAndUpdate({ _id: req.body._id }, {
        is_active:req.body.is_active
    }).then((job) => {
        res.json({'msg':'altered'});
    })
}

function getSpecificJob(req, res) {
    Jobs.findOne({ _id: req.params.j_id }, (err, job) => {
        if (err)
            throw err;
        else
            res.send(job);
    })
}

module.exports = {
    jobPost: jobPost,
    getJobs: getJobs,
    updateJobs: updateJobs,
    getSpecificJob: getSpecificJob,
    softDeleteJobs: softDeleteJobs,
    getAll : getAll
}