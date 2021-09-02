const Router = require("express").Router();
const ProductModel = require('../db/schema/products');
const jwt = require('jsonwebtoken');
const UserModel = require("../db/schema/user");


// router to get only skus of all products

Router.get("/",(req,res)=>{
    try{
        ProductModel.find((err,data)=>{
           if(!err){
               const items = [];
               for(let i =0;i<data.length;i++){
                for(let j = 0; j<data[i].skus.length;j++){
                    // console.log(data[i].skus[j]);
                        items.push(data[i].skus[j]);
               }
            }
            console.log(items);
               res.json(items);
           }else{
            res.json(err);
           }

        })
    }catch(e){
        res.json(e);
    }
});

// router to get all products

Router.get("/all-products",(req,res)=>{
    console.log("hello");
    try{
        ProductModel.find((err,data)=>{
           if(!err){
               res.json(data);
           }else{
            res.json(err);
           }

        })
    }catch(e){
        res.json(e);
    }
});



// router to delete an entire product
Router.delete("/remove/:id",async(req,res)=>{
    const {authorization} = req.headers;
    console.log("hello");
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {_id}  = decoded;
        const user_id = _id;
        const user = await UserModel.findOne({user_id});
        if(user){
            console.log(req.params);
            const _id = req.params.id;
            console.log(_id);
            const product = await ProductModel.findOneAndDelete({_id});
            console.log(product);
            console.log("cudee");
            res.json("success");
        }
    }catch(e){
        console.log("err");
        res.json(e);
    }
})

// router to delete a sku
Router.delete("/:id",async(req,res)=>{
    const {authorization} = req.headers;
    try{
        const decoded = jwt.verify(authorization,process.env.SECRET_KEY);
        const {_id}  = decoded;
        const user_id = _id;
        const user = await UserModel.findOne({user_id});
        if(user){
            const {id} = req.params;

           const product = await ProductModel.find({'skus':{
               $elemMatch : {sku: id}
           }

           });
           if(product){
            const skus = product[0].skus;
            const _id = product[0]._id;
            let index = 0;
            for(let i=0;i<skus.length;i++){
                if(skus[i].sku === id){
                     index = i;
                     break;
                }
            }
            skus.splice(index,1);
            const result = await ProductModel.findByIdAndUpdate(
               {
                   _id
               },
                {
                skus: skus
            },{
                new : true
            });
            console.log(result);
           }

        }
        res.json("success");
    }catch(e){
        console.log(e);
        res.json(e.message);
    }

});

module.exports = Router;