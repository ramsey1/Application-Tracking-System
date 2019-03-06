const express = require('express');
const router = express.Router();

var video = require('../api/video');

router.use('/', video);

module.exports = router;