const {Schema,model,mongo} = require('mongoose');

const UserSchema = new Schema({
    name:String,
    phone_number:Number,
    _id: String,
    hashed_password: String,
    address: []
});
 const UserModel = model("users",UserSchema,"users");
 module.exports = UserModel;