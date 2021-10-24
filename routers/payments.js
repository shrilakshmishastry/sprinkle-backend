const OrderModel = require("../db/schema/orders");
const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const PaymentModel = require("../db/schema/payments");

Router.get("/:id",async(req,res)=>{

    try{
        const _id = req.body.id;
        const payments  = await PaymentModel.findOne({'order_id':_id});
        if(payments){
            res.json(payments);
        }
        else{
            res.json("not found");
        }

    }catch(e){
        res.json({status:"Error",message:"Invalid user"});
    }
});

Router.post("/:id",async(req,res)=>{
    try{

        const order_id = req.params.id;
        const order = await OrderModel.findOne({_id:order_id});
        const {payment_method,transaction_id} = req.body;
        const {user_id} = order;
        const payment = new PaymentModel({
            user_id,
            order_id,
            payment_method,
            transaction_id
        });
        const result = await payment.save();

        res.json({status:"success"});
    }catch(e){
        res.json(e);
    }

})

module.exports = Router;