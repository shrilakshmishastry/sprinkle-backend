const UserModel = require("../db/schema/user");
const jwt = require("jsonwebtoken");

const Router = require("express").Router();

Router.post("/",async(req,res)=>{
    const {email,password} = req.body;


    try{


        const user = await  UserModel.findOne({email});


        if(user){
            const hashed_password = user.hashed_password;

            const decodedpassword = jwt.verify(hashed_password,process.env.SECRET_KEY);
            console.log(decodedpassword.password);
            console.log(password);
            if(password === decodedpassword.password){

                const token = jwt.sign({email},process.env.SECRET_KEY);
                res.status(200).json({accessToken : token});
            }
            else{
                res.status(500).json("Invalid email or password");
            }
        }else{
            res.status(500).json("Invalid email or password");
        }


    }catch(e){

        res.status(500).json("Invalid email or password");
    }

})

module.exports = Router;