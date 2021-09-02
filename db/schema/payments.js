const {Schema,model} = require('mongoose');
const UserModel = require('./user');

const PaymentSchema = new Schema({
     user_id: {
        type: String,
        required: true
    },
    transcation_id:{
        type: String,
    },
    payment_method: {
        type:    String,
        required: true
    },
    order_id:Schema.ObjectId
});

const PaymentModel = model("payments",PaymentSchema,"payments");

module.exports = PaymentModel;