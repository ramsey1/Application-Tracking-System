const express = require('express');
const router = express.Router();

var updatePassword = require('../api/updatePassword');

router.use('/', updatePassword);

module.exports = router;