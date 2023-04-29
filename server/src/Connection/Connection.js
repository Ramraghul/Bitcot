//Requirement
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

//Connection Link
let Link = process.env.LINK;

//Connection;
mongoose.connect(`${Link}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB connected Successfully");
}).catch((error) => {
    console.log(error);
})