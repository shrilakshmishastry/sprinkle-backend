const { Router } = require("express");
const {model,Schema} = require("mongoose");
const SkuSchema = require("./skus");

const ProductsSchema = new Schema({
_id:Schema.ObjectId,
qty:{
    type: Number,
    required: true,
    min: [1,"Must be at least 1,got{value}"]
    },
unit:{
    type:String,
    required: true
},
skus:{
    type: [
        SkuSchema
    ],
    required: true
},
per_bottle_price:{
    type : Number,
    min : [5,"Per Bottel price must be greater than 5 rupees"],
    required: true,
}
});



const ProductModel = model("products",ProductsSchema,"products");

module.exports = ProductModel;