const mongoose = require('mongoose');

if(process.env.NODE_ENV === "production"){
    require("dotenv").config({path:".prod.env"});
}else{
    require("dotenv").config();
}

    console.log(process.env.url);
    const url = process.env.url;
    mongoose.connect(url);

    mongoose.connection.on("errror",err=>{
        console.log(err);
    })
mongoose.connection.on("connected",(err,res)=>{
    console.log(res);
    console.log("hello")
})



