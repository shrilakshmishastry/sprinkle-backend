const {model,Schema} = require("mongoose");

const ProductsSchema = new Schema({
_id:String,
qty: Number,
unit:String,
skus:[],
per_bottel_price:Number
});

const ProductModel = model("products",ProductsSchema,"products");

module.exports = ProductModel;