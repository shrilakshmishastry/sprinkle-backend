const {Schema,model} = require('mongoose');

const PaymentSchema = new Schema({
    _id:String,
    user_id:String,
    payment_method: String,
    order_id:String
});

const PaymentModel = model("payments",PaymentSchema,"payments");

module.exports = PaymentModel;