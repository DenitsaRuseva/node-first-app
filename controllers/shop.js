const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');



exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    const error = new Error(err);
    return next(error);
});
  };


    exports.getIndex = (req, res, next) => {
    Product.find().then(products => {
      res.render('shop/product-list', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
  };

  exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
  };



  exports.getCart = (req, res, next) => {
    User.findById(req.session.user._id)
    .then(user => {
      user.populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        })
      });  
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
    
  };

  exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product => {
     return User.findById(req.session.user._id)
     .then(user => user.addToCart(product));
    })
    .then(result => res.redirect('/'))
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
  };

  exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    User.findById(req.session.user._id)
    .then(user => {
      user.removeFromCart(prodId)
      .then(result => res.redirect('/'));
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
  };
  
  exports.postOrder = (req, res, next) => {
    User.findById(req.session.user._id)
    .then(user => {
      user.populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            email: user.email,
            userId: user
          },
          products: products
        });
        return order.save();
      })
      .then(result => {
        return user.clearCart();
      })
      .then(() => {
        res.redirect('/orders');
      })
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
  };
  
  exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.session.user._id })
      .then(orders => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders
        });
      })
      .catch(err => {
        const error = new Error(err);
        return next(error);
    });
  };

//   // exports.getCheckout = (res, req) => {
//   //   res.render('checkout', {
//   //     pageTitle: 'Checkout',
//   //     path: 'shop/checkout'
//   //   });
//   // };



