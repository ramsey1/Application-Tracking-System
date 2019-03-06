const express = require('express');
const router = express.Router();

var user = require('../api/user');

router.use('/', user);

module.exports = router;