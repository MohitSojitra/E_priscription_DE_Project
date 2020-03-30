
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const priscriptionModel = new Schema({
    u_id:{
        type : String,
        required:true
    },
    doctorId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        
    },
    desies:[
        {
            type : String
        }
    ],
    medicine : [
        {
            type : String
        }
    ],
    time :{
        type : String
    }
},{
    timestamps:true
})


module.exports = mongoose.model("priscription" , priscriptionModel);