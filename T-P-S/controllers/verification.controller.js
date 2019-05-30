const Verification = require('../models/otp.model');

function getVerifyingData(req,res){
    Verification.findOne({u_email:req.params.email},(err, person) => {
        if (err)
            return handleError(err);
        else
            res.send(person);
        });
}

function verify(req,res){
    Verification.findOne({u_email:req.body.email},(err, person) => {
        if (err)
            return handleError(err);
        else{
            let msg = '';
            if(person.token == req.body.token)
            msg = 'success';
            else
            msg = 'fail'
            res.json({'msg':msg});
    }
        });
}

function resendOTP(req,res){

}

module.exports = {
    getVerifyingData : getVerifyingData,
    resendOTP: resendOTP,
    verify:verify
}