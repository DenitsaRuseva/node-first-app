const express = require('express');
const path = require('path');

const rootPath = require('../utill/path');




const router = express.Router();

const products = []; //this is not the appropriate way, because products
                    //will be seen by all users

router.get('/add-product', (req, res) => {
    // res.sendFile(path.join(rootPath, 'views', 'add-product.html'));
    res.render('add-product', {
        pageTitle: 'Add Products',
        products: products,
        path: '/admin/add-product'
    })
});

router.post('/add-product', (req, res) => {
    products.push({title: req.body.title})
    res.redirect('/');
});


module.exports.routs = router;
module.exports.products = products;