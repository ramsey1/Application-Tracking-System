var User = require('../models/user.model');

module.exports.getUser = function (req, res) {
    User.find({}).then((users) => {
        res.send(users);
    });
}