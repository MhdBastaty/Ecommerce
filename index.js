const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require ('dotenv');

const userRoute = require ('./routes/users.js');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then( ()=> console.log("DBConnection is Successful"))
    .catch((error)=>
         {console.log(error)
    });

app.use(express.json());

app.use("/api/users", userRoute);

app.listen(process.env.PORT || 4000, ()=>{
    console.log("Backend Server is running");
})

