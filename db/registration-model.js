const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let registrationSchema = new Schema({
    name:{
        type:String,
        // require:true
    },
    username:{
        type:String,
        // require:true,
        // unique:true
    },
    countrycode:{
        type:String,
        // require:true
    },
    mobile:{
        type:String,
        // require:true
    },
    email:{
        type:String,
        // require:true
    },
    password:{
        type:String,
        // require:true
    },
    gender:{
        type:String,
        // require:true
    },
    dob:{
        type:String,
        // require:true
    },
    profileImage:{
        type:String
    }
})

const postSchema = new mongoose.Schema({
    userName: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true,
        min: 0
    },
    post:{
        type:String
    },
    like:{
        type:Number,
        default:0
    },
    Comment:{
        type:String,
        default:0
    },
    share:{
        type:Number,
        default:0
    },
    profileImage:{
        type:String
    }
})
const newPost = mongoose.model('post', postSchema);
const registration = mongoose.model('registration_collection',registrationSchema);
// module.exports = mongoose.model('registration_collection',registrationSchema);
module.exports = {
    registration : registration,
    newPost : newPost
}