const {Schema,model,mongo} = require('mongoose');
const AddressSchema = require('./address');

const UserSchema = new Schema({
    name:{
        min:[3,'Must be at least 6,got {VALUE}'],
        max:12,
        type:String,
        trim: true,
        required:true
    },
    phone_number:{
        type:  Number,
        trim: true,
        required: true,
        validate:{
            validator: function(v){
                return /\d{10}/.test(v);
            },
            message: props=>`${props.value} is not a valid phone number!`
        }
    },
    email: {
        lowercase: true,
        type : String,
        required:true
    },
    hashed_password: {
        type:String,
        required: true,
    },
    address:{
        min:[3,'Must be at least 6,got {VALUE}'],
        max:12,
        type: [ AddressSchema],
        required: true ,
    },
});
 const UserModel = model("users",UserSchema,"users");
 module.exports = UserModel;