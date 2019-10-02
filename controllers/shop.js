const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        products: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    });
  };

  exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    });
  };

  exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };

  exports.getCart = (req, res) => {
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart'
    });
  };

  exports.getOrders = (req, res) => {
    res.render('shop/orders', {
      pageTitle: 'Your Orders',
      path: '/orders'
    });
  };

  exports.getCheckout = (res, req) => {
    res.render('checkout', {
      pageTitle: 'Checkout',
      path: 'shop/checkout'
    });
  };



