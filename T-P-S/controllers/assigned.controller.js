const Assigned = require('../models/assigned.model');
const Applicant = require('../models/applicant.model');
const Interviewer = require('../models/interviewer.model');
const ToBeAssigned = require('../models/to_be_assigned.model');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

 function getAssignedData(req,res){
    Assigned.find({}).then((assigned)=>{
        res.send(assigned);
    })   
    
}


async function postAssignedData(req,res){
    let app = await Applicant.findOne({ email: req.body.candidateEmail }, 'fullName')
    console.log(app);
    
   
    let int = await Interviewer.findOne({email:req.body.interviewerEmail},'name');
    console.log(int);
    
    let assigned = new Assigned({
        c_email:req.body.candidateEmail,
        i_email:req.body.interviewerEmail,
        j_id: req.body.j_id,
        j_code:req.body.j_code,
        level: req.body.level,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    });

    assigned.c_name = app.fullName;
    assigned.c_id = app._id;

    assigned.i_name = int.name;
    assigned.i_id = int._id;

    assigned.save((err)=>{
        if(err)
        throw err;
        else{
            const msgInterviewer = {
                to: req.body.interviewerEmail,
                from: req.body.adminInfo,
                subject: 'Interview Schedule',
                text: 'Date and Time for interview . . ',
                html: '<table><tr><th>Candidate</th><th>Date</th><th>Time</th></tr><tr><td>'+app.fullName+'</td><td>'+req.body.date+'</td><td>'+req.body.time+'</td></tr></table>',
              };
              sgMail.send(msgInterviewer);    
              
              const msgApplicant = {
                to: req.body.candidateEmail,
                from: req.body.adminInfo,
                subject: 'Interview Schedule',
                text: 'Date and Time for interview . . ',
                html: '<table><tr><th>Candidate</th><th>Date</th><th>Time</th></tr><tr><td>'+int.name+'</td><td>'+req.body.date+'</td><td>'+req.body.time+'</td></tr></table>',
              };
              sgMail.send(msgApplicant);

        res.send(req.body);
        }
    });

        
    
    Interviewer.findOne({email:req.body.interviewerEmail},(err,person)=>{
        person.isAvailable.push(req.body.date+req.body.time);
        person.save((err)=>{
            if(err)
            throw err;
            else
            console.log('saved')
    })
})

    ToBeAssigned.findOneAndUpdate({c_email:req.body.candidateEmail},{
        is_assigned : true
    }).then((assigned)=>{
        console.log('updated');
    });
}

function updateAssigned(req,res){
    Assigned.findOneAndUpdate({c_email:req.body.c_email},{
        status:req.body.status,        
        feedback: req.body.feedback,
        comments: req.body.comments,
        isSubmitted:true
    }).then((assigned)=>{
            res.json({'msg':'Updated'});
        });
}

function getOneAssigned(req,res){
    Assigned.find({c_email:req.body.email}).then((assigned)=>{
        res.send(assigned);
    })
}



module.exports = {
    getAssignedData : getAssignedData,
    postAssignedData : postAssignedData,
    updateAssigned: updateAssigned,
    getOneAssigned : getOneAssigned
}