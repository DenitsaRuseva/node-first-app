const Product = require('../models/product');
// const Cart = require('../models/cart');


exports.getProducts = (req, res) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => console.log(err));
  };

  exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId).then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    }).catch(err => console.log(err));
  };

  exports.getIndex = (req, res) => {
    Product.fetchAll().then(products => {
      res.render('shop/product-list', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }).catch(err => console.log(err));
  };

  exports.getCart = (req, res, next) => {
    req.user.getCart(products => {
      console.log('in')
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })   
  };

  exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product._id, product.price)
    })
    .then(result => res.redirect('shop/index'))
    .catch(err => console.log(err))
  };

  // exports.deleteItemFromCart = (req, res) => {
  //   const productId = req.body.productId;
  //   Product.findById(productId, (product) => {
  //     Cart.deleteProductById(product.id, product.price, () => {
  //       res.redirect('/cart');
  //     });
  //   });
  // };

  // exports.getOrders = (req, res) => {
  //   res.render('shop/orders', {
  //     pageTitle: 'Your Orders',
  //     path: '/orders'
  //   });
  // };

  // exports.getCheckout = (res, req) => {
  //   res.render('checkout', {
  //     pageTitle: 'Checkout',
  //     path: 'shop/checkout'
  //   });
  // };



