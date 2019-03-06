const express = require('express');
const router = express.Router();

assignedController = require('../controllers/assigned.controller');

router.get('/',(req,res)=> assignedController.getAssignedData(req,res));

router.post('/:email',(req,res)=> assignedController.getOneAssigned(req,res));

router.post('/', (req,res)=>assignedController.postAssignedData(req,res));

router.put('/:email',(req,res)=> assignedController.updateAssigned(req,res));


module.exports = router;