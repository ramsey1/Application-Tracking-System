const path = require('path');
const Applicant = require('../models/applicant.model');

module.exports.getVideo= async function (req,res){
    // console.log(req.params.vidFile);
    // res.send(req.params);
    let app = await Applicant.findOne({email:req.params.email},'vidFile');

    console.log(app);



    filepath =  path.join(__dirname,'../uploads') +'/'+app.vidFile;
    console.log(filepath);
    
    res.sendFile(filepath)
}

