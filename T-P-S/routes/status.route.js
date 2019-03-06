const express = require('express');
const router = express.Router();

var status = require('../api/status');

router.use('/', status);

module.exports = router;