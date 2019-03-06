const express = require('express');
const router = express.Router();

loginController = require('../controllers/authencicate.controller');

router.post('/', (req,res)=>loginController.login(req,res));

module.exports = router;