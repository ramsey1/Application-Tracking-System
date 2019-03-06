const express = require('express');
const router = express.Router();

var to_be_assigned = require('../api/to_be_assigned');

router.use('/', to_be_assigned);

module.exports = router;