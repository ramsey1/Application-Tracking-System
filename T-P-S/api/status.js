const express = require('express');
const router = express.Router();

routerController = require('../controllers/status.controller');

router.get('/',(req,res)=>routerController.populateAssigned(req,res));


module.exports = router;