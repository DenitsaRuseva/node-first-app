const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    })
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    req.user.createProduct({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl 
    })
   .then(response => {
        console.log('ADDED PRODUCT');
        res.redirect('/admin/products')}
        ).catch(err => {
            console.log(err);
            res.redirect('/admin/products');
        });
};

exports.getEditProduct = (req, res) => {
    const productId = req.params.productId;
    req.user.getProducts({where: {id: productId}}) //THIS WILL RETURN AN ARRAY
    .then(products => {
        const product = products[0];
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product',
            path: '/edit-product',
            editing: true, 
            product: product
        })
    }).catch(err => console.log(err)); ;
};

exports.postEditProduct = (req, res) =>  {
    const id = req.params.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
   Product.findByPk(id).then(product => {
       product.title = title;
       product.imageUrl = imageUrl;
       product.description = description;
       product.price = price;
       return product.save();
   }).then(result => {
       console.log('UPDATED PRODUCT');
       res.redirect('/admin/products');
   })
   .catch(err =>{
    console.log(err);
    res.redirect('/admin/products');
   });
};


exports.postDeleteProduct = (req, res) => {
    const id = req.params.productId;
    Product.findByPk(id).then(product => {
        return product.destroy()
    }).then(result => {
        console.log('PRODUCT DELETED');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/products');
    });
};



exports.getProducts = (req, res) => {
    req.user.getProducts()
    .then(products => {
        res.render('admin/product-list', {
            products: products,
            pageTitle: 'Admin Products',
            path: 'admin/products'
        });
    }).catch(err => console.log(err));
};