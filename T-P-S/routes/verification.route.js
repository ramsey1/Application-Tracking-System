const express = require('express');
const router = express.Router();

var verification = require('../api/verification');

router.use('/', verification);

module.exports = router;