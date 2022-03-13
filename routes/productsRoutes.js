const router = require('express').Router();
const Products = require('../models/products');


router.post('/',async (req, res) => {

    const { name, price } = req.body;

    if(!name || !price){
        return res.status(400).json({
            error: 'Please provide name and price'
        })
    }

    const product = {
        name,
        price
    }
    
    try
    {
        await Products.create(product);
        res.status(201).json({message: 'Product created'});
    }
    catch(err) {
        res.json({error: err})
    }
});

router.get('/', async (req, res) => {
    try {
        const allProducts = await Products.find();
        if (allProducts == '') {
            res.status(404).json({message: 'No products found'})
        } else {
            res.status(200).json(allProducts)
        }
    }catch(err) {
        res.status(400).json({error: err})
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const productById = await Products.findById(id);
        if (productById == '' || productById == null) {
            res.status(404).json({message: 'No product found'})
        } else {
            res.status(200).json(productById)
        }
    }catch(err) {
        res.status(400).json({error: err})
    }
});

//Validation : if id is not valid!
router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    try {
        await Products.findByIdAndDelete(id);
        res.status(200).json({message: 'Product deleted'})
    }catch(err) {
        res.status(400).json({error: err})
    }
});

router.delete('/', async (req, res) => {
    try {
        const allProducts = await Products.deleteMany();
        res.status(200).json({message: 'All products deleted'})
    } catch(err) {
        res.status(400).json({error: err})
    }
});

module.exports = router;