//Require
const mongoose = require('mongoose');

//Schema
const Product = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        collection: String
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    variation: [
        {
            variant: {
                type: String,
                required: true
            },
            // productImage: {
            //     type:Object,
            //     required:true
            // },
            price: {
                type: Number,
                required: true
            },
            stock: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

//Export;
module.exports = mongoose.model('Product', Product, "Product_Data");

