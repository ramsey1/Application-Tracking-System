const express = require('express');
const router = express.Router();

var jobs = require('../api/jobs');

router.use('/', jobs);

module.exports = router;