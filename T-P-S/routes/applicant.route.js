const express = require('express');
const router = express.Router();

var applicant = require('../api/applicant');

router.use('/', applicant);

module.exports = router;