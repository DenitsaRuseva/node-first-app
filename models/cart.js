const fs = require('fs');
const path = require('path');

// const Product = require('../models/product');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
        
module.exports = class Cart {
            
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };

    static deleteProductById(id, productPrice, cb){
        this.getCart(cart => {
            let updatedCart = {...cart};
            let updatedCartProducts = [...updatedCart.products];
            const cartProductIndex = updatedCartProducts.findIndex(p => p.id == id);
            if(cartProductIndex === -1){
                return cb();
            }
            let updatedTotalPrice = updatedCart.totalPrice;
            updatedTotalPrice = updatedTotalPrice - (updatedCart.products[cartProductIndex].qty * productPrice);
            updatedCartProducts = updatedCartProducts.filter(p => p.id !== id);
            updatedCart.products = [...updatedCartProducts];
            updatedCart.totalPrice = updatedTotalPrice;
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if(err){
                    console.log(err, 'In delete product by id, cart');
                } else {
                    cb();
                };
            });
        });
    };

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
            cb(null);
          } else {
            cb(cart);
          }
        });
    }
};

