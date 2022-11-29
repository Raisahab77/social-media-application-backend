const express = require('express');
const bodyParser = require('body-parser');
const {loadUser} = require('./user_model');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const router = require('./routes/routing')
const app = express();
const PORT = process.env.PORT || 3000;
const cors=require("cors");



app.use(cors());
app.use(bodyParser.json()); // very important line because if we are sending data in json from and not use this then it will show undefine only.
app.use(router);
app.use(express.static("uploads"));

mongoose.connect('mongodb://localhost:27017/feeds', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    })




app.get('/',(req,res)=>{
    res.send("Hello world");
})



app.listen(PORT,()=>console.log(`Server running on port: http://localhost:${PORT}`))











// Things need to be handle --
// *I just deleted uploads folder and in this case my API is throwing error that no folder exist - resolution is we can create a folder in case of no folder.