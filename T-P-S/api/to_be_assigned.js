const express = require('express');
const router = express.Router();

tbaController = require('../controllers/to_be_assigned.controller');

router.post('/',(req,res)=> tbaController.toBeAssigned(req,res));

router.get('/',(req,res)=>tbaController.getTBA(req,res));

router.put('/:c_email',(req,res)=> tbaController.updateTBA(req,res));

module.exports = router;