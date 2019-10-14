const Product = require('../models/product');

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
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    });
    product.save()
   .then(response => {
        console.log('ADDED PRODUCT');
        res.redirect('/admin/products')}
        ).catch(err => {
            console.log(err);
            res.redirect('/admin/products');
        });
};

// exports.getEditProduct = (req, res) => {
//     const productId = req.params.productId;
//     Product.findById(productId)
//     .then(product => {
//         res.render('admin/edit-product', { 
//             pageTitle: 'Edit Product',
//             path: '/edit-product',
//             editing: true, 
//             product: product
//         })
//     }).catch(err => console.log(err)); ;
// };

// exports.postEditProduct = (req, res) =>  {
    
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     // const id = req.params.productId;
//     const id = req.body.productId;

//     console.log(title, imageUrl, price, description, '/////', id);
    
//     const product = new Product(title, imageUrl, price, description, id);
//     product.save()
//    .then(result => {
//        console.log('UPDATED PRODUCT');
//        res.redirect('/admin/products');
//    })
//    .catch(err =>{
//     console.log(err);
//     res.redirect('/admin/products');
//    });
// };


// exports.postDeleteProduct = (req, res) => {
//     const id = req.params.productId;
//     Product.deleteById(id).then(result => {
//         console.log('PRODUCT DELETED');
//         res.redirect('/admin/products');
//     }).catch(err => {
//         console.log(err);
//         res.redirect('/admin/products');
//     });
// };



// exports.getProducts = (req, res) => {
//     Product.fetchAll()
//     .then(products => {
//         res.render('admin/product-list', {
//             products: products,
//             pageTitle: 'Admin Products',
//             path: 'admin/products'
//         });
//     }).catch(err => console.log(err));
// };