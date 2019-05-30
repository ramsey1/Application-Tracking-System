const express = require('express');
const router = express.Router();

userController = require('../controllers/user.controller');

router.get('/',(req,res)=> userController.getUser(req,res));

router.get('/:email',(req,res)=>userController.getUserName(req,res));

module.exports = router;