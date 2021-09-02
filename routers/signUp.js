const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");


Router.post('/', async(req, res) => {
    console.log(req.body);
    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body.data;

    const phone_number = phoneNumber;

    const hashed_password = jwt.sign({password},process.env.SECRET_KEY);
    console.log();
    const token = jwt.sign({email},process.env.SECRET_KEY);

    console.log(name,email,hashed_password,address,phone_number);

    try{
        const emailExist =await UserModel.findOne({email});
        if(emailExist){
            res.json({status:204,message:"User exist"});
        }else{
             const user = new UserModel({
            name,
            phone_number,
            email,
            hashed_password,
            address
        });
        
        const result = await  user.save();
        console.log(result);
        res.json({status:200,accessToken:token});
        }

    }catch(e){
        let message = "";
        if(e.errors){
            const {
                name,
                phone_number,
                _id,
                hashed_password,
                address
            } = e.errors;
            console.log(e.errors);
            if(name){
                message  = `${message}${name.message}`;
            }
            if(phone_number){
                message = `${message}${phone_number.message}`;
            }
            if(_id){
                message = `${message}${_id.message}`;
            }
            if(hashed_password){
                message =  `${message}${hashed_password.message}`;
            }
            if(address){
                message = `${message}${address.message}`;
            }

        }
        else{
            message = "Email already taken"
        }
        res.json({message:message,status:204});
    }

})

module.exports = Router;