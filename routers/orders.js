const OrderModel = require("../db/schema/orders");
const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../db/schema/user");
const CartModel = require("../db/schema/cart");

Router.get("/",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {_id}  = decoded;
        const user_id = _id;
        const items = await OrderModel.findOne({user_id});
        res.json(items);
    }catch(e){
        res.json({status:"Error",message:"Invalid user"});
    }
});
Router.post("/",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {shipping_address,items,price,from}  = req.body.data;
        const {email}  = decoded;

        console.log(req.body.data);
        const user = await UserModel.findOne({email});

        const payment_status = "yet to be payed";

        if(user){

          const order = new  OrderModel({
                user_id:user._id,
                payment_status,
                status:"Process",
                shipping_address,
                items,
                price
            });
            
            const doc = await order.save();
            if(from === 'cart'){
                const itemOfUser = await CartModel.findOneAndUpdate({
                    email:email
                },{
                    item:[]
                },{
                    new:true
                })
            }

            res.status(200).json("success");
        }
    }catch(e){

        res.status(500).json({e});
    }
});


Router.delete("/:id",async(req,res)=>{
    const {authorization} = req.headers;

    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {_id}  = decoded;
        const user_id = _id;
        const user = await UserModel.findOne({user_id});
        if(user){
            const {id} = req.params;
            const _id = id;
            const result = await OrderModel.findOneAndUpdate({_id},{
                status:"Deleted",
                payment_status: "not done"
            },{
                new:true
            });
        }
        res.json("success");
    }catch(e){

        res.json(e.message);
    }

});

module.exports = Router;