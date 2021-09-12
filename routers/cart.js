const jwt  = require('jsonwebtoken');
const CartModel = require('../db/schema/cart');
const UserModel = require('../db/schema/user');

const Router = require('express').Router();


Router.get("/",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {email} = decoded;
        const user = await UserModel.findOne({email});
        if(user){
            CartModel.find({email},(err,data)=>{
                res.status(200).json(data);
            });


        }else{
            res.status(500).json("User doesn't exist");
        }

    }catch(e){
        res.status(500).json("error");
    }
})


Router.post("/",async(req,res)=>{
    const {authorization} = req.headers;

    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {email} = decoded;
        const user = await UserModel.findOne({email});
        if(user){
            const {item} = req.body;
            const itemExist = await CartModel.findOne({email});
            console.log(itemExist);
            if(itemExist){
                const newItemList = itemExist.item;
                newItemList.push(item);
                const docs = await CartModel.findByIdAndUpdate({_id:itemExist._id},{
                    item: newItemList
                });
            }else{
                 const cartItem = new CartModel({
                item,
                email
            });
            const result = await cartItem.save();

            }

            res.status(200).json("success");
        }else{
            res.status(500).json("User doesn't exist");
        }
    }catch(e){
        console.log(e);
        res.status(500).json("error");
    }
})

Router.post("/:id",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {email} = decoded;
        const user = await UserModel.findOne({email});
        if(user){
            const {id} = req.params;
            const {item} = req.body;
            // console.log(id);
            // console.log(item.qty);
            const itemExist = await CartModel.findOne({email});
            if(itemExist){

               let newItems = [...itemExist.item];
                for(let i =0;i<newItems.length;i++){
                    console.log(newItems[i]._id);
                    if(newItems[i]._id === id){
                        newItems[i].qty = item.qty;
                        break;
                    }
                }
                console.log(newItems);

               const items =  await CartModel.findByIdAndUpdate({_id:itemExist._id},{
                    item:newItems
                },{
                    new:true
                });
                console.log(items);
                res.status(200).json({message:"success",item:items.item});
            }else{
                res.status(500).json("error");
            }
        }


    }catch(e){
        console.log(e);
        res.status(500).json("error");
    }
})

Router.delete("/:id",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {email} = decoded;
        const user = await UserModel.findOne({email});
        if(user){
            const {id} = req.params;
            const {item} = req.body;
            // console.log(id);
            // console.log(item.qty);
            const itemExist = await CartModel.findOne({email});
            if(itemExist){

                let newItems = [...itemExist.item];
                let index = 0;
                for(let i =0;i<newItems.length;i++){
                    console.log(newItems[i]._id);
                    if(newItems[i]._id === id){
                       index = i;
                       break;
                    }
                }

                 newItems.splice(index,1);
                const result = await CartModel.findByIdAndUpdate({_id:itemExist._id},{
                    item:newItems
                },{
                    new:true
                });
                res.status(200).json({message:"success",item:result.item});
            }else{
                res.status(500).json("error");
            }
        }


    }catch(e){
        console.log(e);
        res.status(500).json("error");
    }
})

module.exports = Router;