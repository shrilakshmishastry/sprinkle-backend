const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");


Router.post('/', async(req, res) => {

    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body.data;

    const phone_number = phoneNumber;

    const hashed_password = jwt.sign({password},process.env.SECRET_KEY);
   

    const token = jwt.sign({email},process.env.SECRET_KEY);



    try{
        const emailExist =await UserModel.findOne({email});
        if(emailExist){
            res.status(500).json({message:"User exist"});
        }else{
             const user = new UserModel({
            name,
            phone_number,
            email,
            hashed_password,
            address
        });

        const result = await  user.save();

        res.status(200).json({accessToken:token});
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
        res.status(500).json({message});
    }

})

module.exports = Router;