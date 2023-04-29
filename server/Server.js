//All Require;
require('./src/Connection/Connection');
const user = require('./src/Controller/User_Controller');
const product = require('./src/Controller/Product_Controller.js');
const express = require('express')
const cors = require('cors');
const App = express();

//Middleware;
App.use(express.json());
App.use(cors({ origin: "*" }));


//Routers;
App.use('/user', user);
App.use('/product', product);


//Port Listing;
const PORT = process.env.PORT || 7000;
App.listen(PORT, () => {
    console.log('Port Running On' + ' ' + PORT);
});

