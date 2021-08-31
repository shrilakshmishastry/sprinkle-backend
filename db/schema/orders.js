const {Schema,model,mongo} = require('mongoose');

const OrderSchema = new Schema({
    _id: String,
    user_id:String,
    payment_status:String,
    status:String,
    price:Number,
    items:[],
    shipping_address:{}
});

const OrderModel = model("orders",OrderSchema,"orders");

module.exports = OrderModel;