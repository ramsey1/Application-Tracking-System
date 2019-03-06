const path = require('path');
Applicant = require('../models/applicant.model');


module.exports.getResume = async function (req,res){

    let app = await Applicant.findOne({email:req.params.email},'resFile');

    console.log(app);

    filepath = path.join(__dirname,'../uploads') +'/'+app.resFile;
    console.log(filepath);

    // res.send(app);

    res.sendFile(filepath);
} 