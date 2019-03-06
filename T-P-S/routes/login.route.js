const express = require('express');
const router = express.Router();

var login = require('../api/login');

router.use('/', login);

module.exports = router;