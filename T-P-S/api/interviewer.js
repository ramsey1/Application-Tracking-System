const express = require('express');
const router = express.Router();

interviewerController = require('../controllers/interviewer.controller');

router.get('/',(req,res)=> interviewerController.getInterviewer(req,res));

router.post('/', (req,res)=>interviewerController.postInterviewer(req,res));

router.post('/:email',(req,res)=>interviewerController.getOneInterviewer(req,res));

router.put('/:_id',(req,res)=>interviewerController.softDeleteInterviewer(req,res));

module.exports = router;