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
const DB_USERNAME = encodeURI('silverio');
const DB_PASSWORD = encodeURIComponent('NImIRt9wzYrqKLRW')
const DB_DATABASE = ('ProductsApi')
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@clusterproductapi.gz7z1.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`

//Inicialize MongoDb and Express
mongoose.connect(uri,()=>{
    try {
        console.log('connected to mongodb');
        app.listen(port, () => console.log(`http://localhost:${port}`))
    } catch (error) {
        console.log('error connecting to mongodb');
    }
});

