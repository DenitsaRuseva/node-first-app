const express = require('express');
const path = require('path');

const rootPath = require('../utill/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile(path.join(rootPath, 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', {
        pageTitle: 'Shop',
        path: '/',
        products: products
    });
});

module.exports = router;