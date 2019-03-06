const Applicant = require('../models/applicant.model');
const ToBeAssigned = require('../models/to_be_assigned.model');

// var tbaapplicants = [];

// async function toBeAssigned(req,res){
//     applicant = new Array;

//     tbaapplicants  = await Applicant.find({})
//     console.log(tbaapplicants);
//     // res.send(tbaapplicants);

//     let tba =new ToBeAssigned();

    
//         tba.c_id = tbaapplicants[1]._id;
//         tba.j_id = tbaapplicants[1].j_id;
    

//     tba.save((err)=>{
//         if (err)
//         console.log(err);
//     else
//         console.log('ok');
//     })

//     res.send(tba);


// }

 function toBeAssigned(req,res){
    let tba = new ToBeAssigned({
        c_id : req.body.c_id,
        c_email:req.body.c_email,
        j_id: req.body.j_id,
        j_code:req.body.j_code
    });

    tba.save((err)=>{
        if(err)
        throw err
        else
        res.send(req.body);
    })
}

function getTBA(req,res){
    ToBeAssigned.find({}).then((tba)=>{
        res.send(tba);
    });
}

function updateTBA(req,res){
    ToBeAssigned.findOneAndUpdate({c_email:req.body.c_email},{
        is_assigned: req.body.is_assigned
    }).then(upd=>{
        res.send(upd)
    });
}

module.exports={
    toBeAssigned : toBeAssigned,
    getTBA : getTBA,
    updateTBA: updateTBA
}