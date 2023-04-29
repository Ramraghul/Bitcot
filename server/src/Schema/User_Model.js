//Require
const mongoose = require('mongoose');

//Define Schema model;
const Users = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        collection: String
    },
    password: {  
        type: String,
        required:true 
    },
    

}, { timestamps: true })

module.exports = mongoose.model('User', Users, "User_Data");

