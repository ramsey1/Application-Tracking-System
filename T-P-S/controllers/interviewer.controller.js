const Interviewer = require('../models/interviewer.model');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

function postInterviewer(req,res){
let interviewer = new Interviewer({
    name:  req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    adminInfo: req.body.adminInfo
});

interviewer.save((err)=>{
if(err)
console.log(err);
else{
    const msg = {
        to: req.body.email,
        from:  req.body.adminInfo,
        subject: 'Login Credentials',
        text: 'Welcome, your login credentials for IP are . . ',
        html: '<b>Email</b>'+ req.body.email + '<br>'+'<b>Password</b>'+ req.body.password,
      };
      sgMail.send(msg);      
res.send(req.body);}
});


}

function getInterviewer(req,res){
    Interviewer.find({}).then((interviewers)=>{
        res.send(interviewers);
    });
}

function getOneInterviewer(req,res){
    Interviewer.findOne({email:req.body.email},'name',(err,person)=>{
        if(err)
        throw err;
        else
        res.send(person);
    });
}

function softDeleteInterviewer(req,res){
Interviewer.findOneAndUpdate({_id:req.body._id},{
    isActive:false
}).then((job) => {
    res.send('removed');
})    
}

module.exports = {
    postInterviewer : postInterviewer,
    getInterviewer : getInterviewer,
    getOneInterviewer : getOneInterviewer
}