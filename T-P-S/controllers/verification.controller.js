const Verification = require('../models/otp.model');

function getVerifyingData(req,res){
    Verification.findOne({u_email:req.params.email},(err, person) => {
        if (err)
            return handleError(err);
        else
            res.send(person);
        });
}

function resendOTP(req,res){

}

module.exports = {
    getVerifyingData : getVerifyingData,
    resendOTP: resendOTP
}