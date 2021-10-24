const {Schema,model}  = require('mongoose');
const CartItemSchema = require('./cart.js');


const CartSchema = new Schema({
    item:{
        type: [
            CartItemSchema
        ],
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const CartModel = model("cart",CartSchema,"cart");
module.exports = CartModel;