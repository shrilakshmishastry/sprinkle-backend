const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");


Router.post('/', async(req, res) => {

    const {
        name,
        email,
        password,
        phone_number,
        address
    } = req.body;
    const _id = email;

    const hashed_password = jwt.sign({password},process.env.SECRET_KEY);

    const token = jwt.sign({_id},process.env.SECRET_KEY);

    console.log(name,email,hashed_password,address,_id,phone_number);

    try{
        const user = new UserModel({
            name,
            phone_number,
            _id,
            hashed_password,
            address
        });
        await  user.save();
        res.json({status:"success",accessToken:token});
    }catch(e){
        console.log(e);
        res.json({status:"Error",message:"Email already taken"});
    }

})

module.exports = Router;