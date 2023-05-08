const Products = require('../models/product')
const connectDB = require('../config/db')
const axios = require('axios')

connectDB()

const addProduct = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;
        await Products.deleteMany()
        await Products.insertMany(products)
        console.log('Data imported')
    } catch (err) {
        console.log(err)
    } finally {
        process.exit()
    }
}

addProduct()