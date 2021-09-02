const {Schema,model} = require('mongoose');

const AddressSchema = Schema({
    address_first_line:{
       type: String,
       required: true
    },
    address_second_line:{
       type: String,
        required: true
    },
    city:{
        type:    String,
        required: true
    },
    state:{
        type:    String,
        required: true
    },
    postal:{
        type:Number,
        min:[6,'Postal code invalid']
    }
});

module.exports = AddressSchema;