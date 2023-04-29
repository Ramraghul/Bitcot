//Require
const Product = require('../Schema/Product_Model');
const express = require('express');
const Path = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// image storege;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Image') // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });



//Create new product (Postman Check);
Path.post('/new_product', upload.single('image'), async (req, res) => {
    try {
        // const variants = req.body.product.variation.map((variant, index) => {
        //     return {
        //         variant: variant.variant,
        //         price: variant.price,
        //         stock: variant.stock,
        //         productImage: {
        //             data: files[index].buffer,
        //             contentType: files[index].mimetype,
        //         },
        //     };
        // });


        // Create new product with updated variant objects
        const newProduct = new Product({
            productName: req.body.product.productName,
            category: req.body.product.category,
            status: req.body.product.status,
            description: req.body.product.description,
            variation: req.body.product.variation,
        });

        // Save new product to database
        const savedProduct = await newProduct.save();
        res.status(201).json({ Message: 'Successfully created a new product' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});




//Get all Product detail from database (Postman Check) (Integration Done);
Path.get('/product_data', async (req, res) => {
    try {
        //Get the all product details;
        let Data = await Product.find()
        res.status(200).json({ Product: Data })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


// View particular product and Edit
//Get particular product (Postman Check);
Path.post('/product_data_by_ID', async (req, res) => {
    try {
        // Get one Particular product
        let product_id = req.body.productId;
        let product_detail = await Product.findOne({ _id: product_id })
        res.status(200).json({ product: product_detail })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//Update particular product detail (Postman Check);
Path.put('/update_product', async (req, res) => {
    try {
        // find the particular product and update the data;
        const updateId = req.body.updatedProduct.id;
        const updateData = req.body.updatedProduct.product;
        const updatedProduct = await Product.updateOne({ _id: updateId }, updateData);
        if (updatedProduct.modifiedCount > 0) {
            res.status(200).json({ message: "Successfully updated product." });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete Product
Path.post('/delete_product', async (req, res) => {
    try {
        let data = req.body.id;
        let check = await Product.findOneAndDelete({ _id: data })
        console.log(check);
        res.status(200).json({ Message: "Delete Done" })
    } catch (error) {
        res.status(500).json(error)
    }
})



//This model Import;
module.exports = Path;