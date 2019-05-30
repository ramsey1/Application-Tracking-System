var User = require('../models/user.model');

// module.exports.getUser = function (req, res) {
//     User.find({}).then((users) => {
//         res.send(users);
//     });
// }

function getUserName(req,res){
    User.find({email:req.params.email},'username',(err,user)=>{
        if(err){
            console.log(err);
            
        }
        if(user){
            res.send(user);
        }
    })
}

module.exports = {
    getUserName : getUserName
}