const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

exports.postAddProduct = (req, res) => {
    const product = new Product(null, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product',
            path: '/edit-product',
            editing: true, 
            product: product
        });
    });
};

exports.postEditProduct = (req, res) =>  {
    // const product = new Product(req.body.productId, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
   const product = new Product(req.params.productId, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/admin/products');
};

exports.deleteProduct = (req, res) => {
    Product.deleteById(req.params.productId, () => {
        res.redirect('/admin/products');
    });
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