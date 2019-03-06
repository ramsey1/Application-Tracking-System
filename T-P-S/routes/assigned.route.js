const express = require('express');
const router = express.Router();

var assigned = require('../api/assigned');

router.use('/', assigned);

module.exports = router;