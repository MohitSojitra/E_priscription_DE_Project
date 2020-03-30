var express = require('express');
const bodyParser = require("body-parser");
const Priscription = require("../models/ePriscription");
const passport = require("passport");
const authenticate = require("../authenticate")

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/user', authenticate.verifyUser, function (req, res, next) {
  Priscription.find({u_id : req.user.u_id})
  .populate("doctorId")
    .then((prisc) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(prisc);
    }).catch((err) => next(err));
});

router.get('/doctor' , authenticate.verifyUser , authenticate.verifyDoctor ,(req,res,next)=>{
  Priscription.find({doctorId : req.user._id})
  .populate("doctorId")
  .then((prisc) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type" , "application/json");
    res.json(prisc);
  })
})

router.post("/" , authenticate.verifyUser , authenticate.verifyDoctor , async (req,res,next)=>{
    req.body.doctorId = req.user._id;
    let prisc = await Priscription.create(req.body);
    res.statusCode = 200;
    res.setHeader("content-type" , "application/json");
    res.json(prisc);
})

module.exports = router;