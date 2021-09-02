const {Schema,model,mongo} = require('mongoose');
const UserModel = require('../schema/user');
const AddressSchema = require('./address');
const SkuSchema = require('./skus');

const OrderSchema = new Schema({
      user_id: {
        type: String,
        required: true
    },
    payment_status:{
        type: String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    price:{
        type:    Number,
        required: true,
        min: [5,"Price should be min 5 rupess"]
    },
    items:{
        type: [SkuSchema],
        required: true,
        minlength: [1]
    },
    shipping_address:{
        type: AddressSchema,
        required: true,
    }
});

const OrderModel = model("orders",OrderSchema,"orders");

module.exports = OrderModel;