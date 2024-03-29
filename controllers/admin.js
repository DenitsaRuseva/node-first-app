const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        userId: req.session.user._id
    });
    product.save()
   .then(response => {
        console.log('ADDED PRODUCT');
        res.redirect('/admin/products')})
    .catch(err => {
        const error = new Error(err);
        return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product',
            path: '/edit-product',
            editing: true, 
            product: product
        })
    }).catch(err => {
        const error = new Error(err);
        return next(error);
    }); 
};

exports.postEditProduct = (req, res, next) =>  {
    
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    
    const id = req.body.productId;

    Product.findById(id)
    .then(product => {
        if (product.userId.toString() !== req.session.user._id.toString()) {
            return res.redirect('/');
        }
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        product.save();
    })
   .then(result => {
       console.log('UPDATED PRODUCT');
       res.redirect('/admin/products');
   })
   .catch(err => {
    const error = new Error(err);
    return next(error);
});
};


exports.postDeleteProduct = (req, res) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id, userId: req.session.user._id }).then(result => {
        console.log('PRODUCT DELETED');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/products');
    });
};



exports.getProducts = (req, res, next) => {
    Product.find({ userId: req.session.user._id})
    .then(products => {
        res.render('admin/product-list', {
            products: products,
            pageTitle: 'Admin Products',
            path: 'admin/products'
        });
    }).catch(err => {
        const error = new Error(err);
        return next(error);
    });
};