const mongoose = require ("mongoose");
require("dotenv").config();

function connectTOdb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to the DB ");
    })
    .catch(err=>{
        console.log("Error connecting to database",err);
        
    })
}

module.exports = connectTOdb;