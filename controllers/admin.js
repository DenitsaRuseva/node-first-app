const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product'
    })
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            products: products,
            pageTitle: 'Admin Products',
            path: 'admin/products'
        });
    });
};