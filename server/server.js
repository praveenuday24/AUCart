require("dotenv").config();

const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB Connected");
    
        server.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`) 
        });
    })
    .catch((err)=>{
        console.log(err);
    })