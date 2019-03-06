const express = require('express');
const router = express.Router();

verificationController = require('../controllers/verification.controller');

router.get('/:email',(req,res)=> verificationController.getVerifyingData(req,res));

module.exports = router;