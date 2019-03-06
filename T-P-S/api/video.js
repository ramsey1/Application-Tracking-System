const express = require('express');
const router = express.Router();

videoController = require('../controllers/video.controller');

router.get('/:email',(req,res)=>videoController.getVideo(req,res));

module.exports = router;