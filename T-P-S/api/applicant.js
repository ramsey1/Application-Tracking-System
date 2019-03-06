const express = require('express');
const router = express.Router();
const multer = require('multer');
var path = require('path')

const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
      
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname) );
    }
});
let upload = multer({storage: storage});

applicantController = require('../controllers/applicant.controller');

router.get('/',(req,res)=> applicantController.getApplicant(req,res));

router.post('/:email',(req,res)=>applicantController.getOneApplicant(req,res));

router.post('/',upload.fields([{name:'resFile', maxCount: 1},{name:'vidFile', maxCount: 1}]), (req,res)=>{
  applicantController.postApplicant(req,res)
// // console.log(req.files.resFile);
// // console.log(req.files.vidFile);

// // console.log(req.body);

// console.log(req.body);
// console.log(req.files);

});

router.put('/',(req,res)=>applicantController.updateOneApplicant(req,res));


module.exports = router;