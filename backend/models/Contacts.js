const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    pincode:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('contact', ContactSchema);