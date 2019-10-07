const Product = require('../models/product');
const Cart = require('../models/cart');


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

  exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      });
    });
  };

  exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.fetchAll(allProoducts => {
      Product.findById(productId, product => {
        Cart.addProduct(product.id, product.price, (err) => {
          if(err){
            console.log(err);
          } 
          res.render('shop/index', {
          pageTitle: 'Shop',
          path: '/',
          products: allProoducts
        });
        });
      });
    });
  };

  exports.deleteItemFromCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
      Cart.deleteProductById(product.id, product.price, () => {
        res.redirect('/cart');
      });
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



