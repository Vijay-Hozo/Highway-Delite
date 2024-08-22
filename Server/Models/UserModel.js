const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    first_name : {
        type: String,
        // required: true
    },
    last_name : {
        type: String,
        // required: true
    },  
    password:{
        type: String,
        // required: true
    },
    email:{
        type: String,
        // required: true
    },
    otp:{
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }
})

const UserModel = new mongoose.model('User',UserSchema);
module.exports = UserModel;