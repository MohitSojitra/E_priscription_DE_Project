
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User= require("./models/userModel");


// exports.loginUser = passport.authenticate("local" ,new localStrategy(User.authenticate()))
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = (user)=>
{
    return jwt.sign(user , "12345-67890-09876-54321" , {expiresIn : 3600});
}

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "12345-67890-09876-54321"

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate("jwt" , {session : false});

exports.verifyDoctor = (req,res,next)=>{
    if(req.user.doctor)
    {
        next();
    }
    else{
        err = new Error('You are not authorized to perform this operation!');
        res.statusCode = 403;
        next(err);
        return
    }
}

exports.verifyAdmin = (req,res,next)=>{
    if(req.user.admin)
    {
        next();
    }
    else{
        err = new Error('You are not authorized to perform this operation!');
        res.statusCode = 403;
        next(err);
        return
    }
}