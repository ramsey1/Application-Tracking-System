const express = require('express');
const router = express.Router();

jobController = require('../controllers/jobs.controller');

router.get('/',(req,res)=> jobController.getJobs(req,res));

router.get('/:j_id',(req,res)=> jobController.getSpecificJob(req,res));

router.post('/', (req,res)=>jobController.jobPost(req,res));

router.put('/',(req,res)=>jobController.updateJobs(req,res));

router.put('/:_id',(req,res)=>jobController.softDeleteJobs(req,res));

module.exports = router;