const express=require("express");
const app=express();
const mongoose=require("mongoose")
require("dotenv").config({path:"./.env"})
require("./models/Usermodel")
require("./models/postmodel")

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("listening at 3000")
    })
}).catch((error)=>{
     console.log(error)
})

