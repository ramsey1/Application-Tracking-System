const express = require('express');
const router = express.Router();

resumeController = require('../controllers/resume.controller');

router.get('/:email',(req,res)=>resumeController.getResume(req,res));

module.exports = router;