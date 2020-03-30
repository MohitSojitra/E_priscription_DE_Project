var express = require('express');
const bodyParser = require("body-parser");
const Users = require("../models/userModel");
const passport = require("passport");
const authenticate = require("../authenticate")

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
  Users.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        user: users
      });
    }).catch((err) => next(err));
});

router.get('/:userId' , authenticate.verifyUser , authenticate.verifyDoctor ,(req,res,next)=>{
  Users.findOne({username : req.params.userId})
  .then((user) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type" , "application/json");
    res.json(user);
  })
})


router.post("/signup", async (req, res, next) => {
  let x = await Users.find({});
  let size = x.length;
  Users.register(new Users({
    username: req.body.username,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    u_id : size+1,
    applyDoctor : req.body.applyDoctor
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        err: err
      });
    } else {

      user.save()
        .then((user) => {
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "Application/json");
            res.json({
              status: "ok",
              remark: "succesfully",
              user: user
            })
          }).catch((err) => next(err));
        })
    }
  })

})

router.post("/login", passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({
    _id: req.user._id
  })
  res.statusCode = 200;
  res.setHeader("Content-Type", "Application/json");
  res.json({
    message: "Successfuly logon",
    token: token
  });
})

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("sessionId");
    res.redirect("/");
  } else {
    let err = new Error("You are already logout.");
    err.status = 403;
    next(err);
  }
})

module.exports = router;