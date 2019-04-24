const server = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
const way2sms = require('way2sms');


const app = server();

const jobs = require('./routes/jobs.route');

const interviewer = require('./routes/interviewer.route');

const applicant = require('./routes/applicant.route');

const register = require('./routes/register.route');

const user = require('./routes/user.route');

const login = require('./routes/login.route');

const to_be_assigned = require('./routes/to_be_assigned.route');

const assigned = require('./routes/assigned.route');

const status = require('./routes/status.route');

const resume = require('./routes/resume.route');

const video = require('./routes/video.route');

const verification = require('./routes/verification.route');

const updatePassword = require('./routes/updatePassword.route');

require('./config/passport');


app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ATS", { useNewUrlParser: true });

mongoose.connection.once('open',function(){
    console.log('connected successfully');
}).on('error',function(error){
    console.log('not connected ',error);
});


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({"extended" : false}));

app.use(passport.initialize());

app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/jobs',jobs);
app.use('/api/interviewer', interviewer);
app.use('/api/applicant', applicant);
app.use('/api/users', user);
app.use('/api/to_be_assigned',to_be_assigned);
app.use('/api/assigned',assigned);
app.use('/api/status', status);
app.use('/api/resume',resume);
app.use('/api/video',video);
app.use('/api/verification',verification);
app.use('/api/updatePassword',updatePassword)

// async function sendOTP(){
//     cookie = await way2sms.login('9871252265','me@way2sms');
    
//     await way2sms.send(cookie, '9871252265', 'foggy day');

//     console.log('sent otp');
    
    
//     }

// const mail='hello';

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey('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');
// const msg = {
//   to: 'mklvrm262@gmail.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html:  '<strong> msg and easy to do anywhere, even with Node.js</strong>'+ mail,
// };
// sgMail.send(msg);

app.listen(3000,()=>{
    console.log('Server is listening on Port',3000);
});
