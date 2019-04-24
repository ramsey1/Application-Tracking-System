const express = require('express');
const router = express.Router();

updateController = require('../controllers/authencicate.controller');

router.put('/',(req,res)=> updateController.update(req,res));

module.exports = router;