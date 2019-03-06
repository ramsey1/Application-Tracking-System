const express = require('express');
const router = express.Router();

var register = require('../api/register');

router.use('/', register);

module.exports = router;