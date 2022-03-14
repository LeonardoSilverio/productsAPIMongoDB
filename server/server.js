//.env
require('dotenv').config();

//Express Config
const express = require('express');
const app = express();
const port = 3000

//Midlleware Json Config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Products Routes Config
const productsRoutes = require('../routes/productsRoutes');
app.use('/products',productsRoutes);


//MongoDb Config
const mongoose = require('mongoose');
const DB_USERNAME = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@clusterproductapi.gz7z1.mongodb.net/ProductsApi?retryWrites=true&w=majority`

//Inicialize MongoDb and Express
mongoose.connect(uri,()=>{
    try {
        console.log('connected to mongodb');
        app.listen(port, () => console.log(`http://localhost:${port}`))
    } catch (error) {
        console.log('error connecting to mongodb');
    }
});

