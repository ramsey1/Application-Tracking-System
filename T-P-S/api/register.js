const express = require('express');
const router = express.Router();

registerController = require('../controllers/authencicate.controller');

router.post('/',(req,res)=> registerController.register(req,res));

module.exports = router;