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

  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
      .deleteItemFromCart(prodId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };
  
  exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
      .addOrder()
      .then(result => {
        res.redirect('/orders');
      })
      .catch(err => console.log(err));
  };
  
  exports.getOrders = (req, res, next) => {
    req.user
      .getOrders()
      .then(orders => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders
        });
      })
      .catch(err => console.log(err));
  };

  // exports.getCheckout = (res, req) => {
  //   res.render('checkout', {
  //     pageTitle: 'Checkout',
  //     path: 'shop/checkout'
  //   });
  // };



