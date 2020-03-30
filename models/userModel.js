
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userModel = new Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    u_id:{
        type : String,
        required : true
    },
    applyDoctor:{
        type : String,
        required : true
    },
    doctor: {
        type:Boolean,
        default:false
    },
    admin : {
        type : Boolean,
        default: false
    }
},{
    timestamps:true
})

userModel.plugin(passportLocalMongoose);
module.exports = mongoose.model("user" , userModel);