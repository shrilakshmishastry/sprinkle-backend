const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");

Router.get("/",async(req,res)=>{
    const {authorization} = req.headers;

    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {email}  = decoded;
        const user = await UserModel.findOne({email});
        const {name,phone_number,address} = user;

        res.json({status:"success",info :{email,name,phone_number,address}});
    }catch(e){
        res.send(204,'user not found');
    }
})

Router.post("/",async(req,res)=>{
    const {authorization} = req.headers;

    try{
        console.log("hello");
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        console.log(decoded);
        const email  = decoded.email;
        const user = await UserModel.findOne({email});
        if(user){
            console.log(req.body);
            const {
                email_updated,
                name,
                phone_number,
                address
            } = req.body.userData;

            const update = await UserModel.findOneAndUpdate({email},{
                email :email_updated,
                name,
                phone_number,
                address
            },{
                new:true
            });
            console.log("hshsh");
            console.log(update);



            res.json({status:200,info :update});
        }

    }catch(e){
        res.status(204).json({message:'user not found'});
    }
})


module.exports = Router;