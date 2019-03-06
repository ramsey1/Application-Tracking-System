const express = require('express');
const router = express.Router();

var resume = require('../api/resume');

router.use('/', resume);

module.exports = router;