const UserModel = require("../db/schema/user");
const jwt = require("jsonwebtoken");

const Router = require("express").Router();

Router.post("/",async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);

    try{


        const user = await  UserModel.findOne({email});

        console.log(user);
        console.log("user");
        if(user!=null){
            const hashed_password = user.hashed_password
            const decodedpassword = jwt.verify(hashed_password,process.env.SECRET_KEY);
            console.log(decodedpassword);
            if(password === decodedpassword.password){
                console.log(password);
                const token = jwt.sign({email},process.env.SECRET_KEY);
                res.json({status:200,accessToken : token});
            }

        }else{
            res.json({status: 204,mesage:"Invalid email or password"});
        }


    }catch(e){
        console.log(e);
        res.json({status: 204,mesage:"Invalid email or password"});
    }

})

module.exports = Router;