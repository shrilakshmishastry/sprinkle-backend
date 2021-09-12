const {Schema,model,Types} = require("mongoose");

const CartItemSchema = Schema({
    _id:{
        type: Types.ObjectId
    },
    sku : {
        type:String,
        required:true
    },
    qty:{
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required: true,
        minLength:[4,'Sku name must be atleast 4 , got{VALUE} ']
    },
    price: {
        type:    Number,
        required: true,
        min: [5,'Price must be greater than 5 rupees']
    },
    quantity:{
        type:    Number,
        required: true
    },
    tag: {
        type:String}
});

module.exports = CartItemSchema;