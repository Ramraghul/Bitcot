//Requirement;
const User = require('../Schema/User_Model');
const express = require('express');
const Path = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let Secret = process.env.SEC;


//Postman Checking purpose;
Path.get('/', (req, res) => {
    res.send('<h1>User Controller working..!</h1>')
})


//New User Register (Postman Check);
Path.post('/new_user', async (req, res) => {
    try {
        let emailCheck = req.body.email
        //user password conert to hash
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        // checking for user email id is used or not;
        let validate = await User.findOne({ email: emailCheck })
        if (validate) {
            res.status(404).json({ Message: "User already exist" });
        } else {
            //create new user
            let inward = new User(req.body);
            inward.save().then((data) => {
                res.status(201).json({ Message: 'successfully new user created' })
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



//user login validation and send token for further API calls (Postman Check);
Path.post('/login', async (req, res) => {
    try {
        //check user exist or not;
        let Match = req.body.email;
        let mail = await User.findOne({ email: Match })
        if (mail == null) {
            return res.status(404).json({ Message: "User Not Found" });
        }
        //email && password compar;
        let compare = await bcrypt.compare(req.body.password, mail.password);
        if (compare) {
            let token = jwt.sign({ _id: mail._id }, Secret, { expiresIn: '20m' });
            return res.status(200).json({Message:'Successfully login', Token: token });
        } 
        return res.status(404).json({ Message: "Email or Password wrong" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})





//This model Import;
module.exports = Path;