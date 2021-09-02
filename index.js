const express = require('express');
const cors = require('cors');
const UserModel = require('./db/schema/user');
const OrderModel = require('./db/schema/orders');
const PaymentModel = require('./db/schema/payments');
const ProductModel = require('./db/schema/products');
const mongoose = require('mongoose');


const LoginRouter = require('./routers/login');
const SignUpRouter = require('./routers/signUp');
const ProductsRouter = require('./routers/products');
const TopProductsRouter = require('./routers/top-products');
const UserRouter = require('./routers/users');
const OrderRouter = require('./routers/orders');
const PaymentRouter = require('./routers/payments');


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())

if(process.env.NODE_ENV === "production"){
    require("dotenv").config({path:".prod.env"});
}else{
    require("dotenv").config();
}


// how to move this to  index.js inside db
const dbName = "sprinkle";
const url = `mongodb://localhost:27017/${dbName}`;


try{
    mongoose.connect(url);
}catch(e){
    console.log(e);
}
// try{
//     connectDb();
// }catch(e){
//     console.log(e);
// }

app.use("/login",LoginRouter);
app.use("/signup",SignUpRouter);
app.use("/products",ProductsRouter);
app.use("/top-products",TopProductsRouter);
app.use("/user-info",UserRouter);
app.use("/order-summary",OrderRouter);
app.use("/payments",PaymentRouter)

app.get("/",(req,res)=>{
        // UserModel.find((err,data)=>{
        //     console.log(err);
        //     console.log(data);
        // });
        // OrderModel.find((err,data)=>{
        //     console.log(err);
        //     console.log(data);
        // })
        // PaymentModel.find((err,data)=>{
        //     console.log(err);
        //     console.log(data);
        // })
        ProductModel.find((err,data)=>{
            console.log(err);
            console.log(data);
            data[0].skus.map((val)=>{
                console.log(val);
            })
        })

    res.send('Hello world');
})

app.listen(port,()=>{
    console.log(`application is running in ${port}`);
})