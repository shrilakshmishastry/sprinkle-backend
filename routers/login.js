const UserModel = require("../db/schema/user");
const jwt = require("jsonwebtoken");

const Router = require("express").Router();

Router.post("/",async(req,res)=>{
    const {email,password} = req.body;
    const _id = email;
    try{
        const hashed_password = jwt.sign({password},process.env.SECRET_KEY);
        const user = await  UserModel.findOne({_id,hashed_password});
        const token = jwt.sign({_id},process.env.SECRET_KEY);
        res.json({status:"success",accessToken : token});
    }catch(e){
        console.log(e);
        res.json({status: "Error",mesage:"Invalid email or password"});
    }

})

module.exports = Router;