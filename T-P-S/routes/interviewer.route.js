const express = require('express');
const router = express.Router();

var interviewer = require('../api/interviewer');

router.use('/', interviewer);

module.exports = router;