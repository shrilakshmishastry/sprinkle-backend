const Router = require("express").Router();
const ProductModel = require('../db/schema/products');

Router.get("/",(req,res)=>{
    try{
        ProductModel.find((err,data)=>{
          if(!err){
              const items = [];
              for (let i=0;i<data.length;i++){
                //   console.log(data[i]);
                  for(let j = 0; j<data[i].skus.length;j++){
                    // console.log(data[i].skus[j]);
                    if(data[i].skus[j].quantity >=100){
                        items.push(data[i].skus[j]);
                    }

                  }
              }
              
              res.json(items);
          }

        })
    }catch(e){
        res.json(e);
    }
});

module.exports = Router;