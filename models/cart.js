const fs = require('fs');
const path = require('path');

// const Product = require('../models/product');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

const writeCartToFile = (cart, cb) => {
    fs.writeFile(p, JSON.stringify(cart), err => {
        if(err){
            console.log(err);
            cb(err);
        } else {
            cb();
        }
    })
};

// const readCartFromFile = (cb) => {
//     fs.readFile(p, (err, fileContent) => {
//         if(err){
//             console.log(err);
//             const cart = { products: [], totalPrice: 0 };
//             cb(cart);
//         } else {
//             cb(JSON.parse(fileContent));
//         };
//     });
// };
        
module.exports = class Cart {
            
    static addProduct(id, productPrice, cb) {

        this.getCart(cart => {
            let updatedCart = {...cart};
            const existingProductIndex = updatedCart.products.findIndex(p => p.id === id);
            const existingProduct = updatedCart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                updatedCart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                updatedCart.products = [...cart.products, updatedProduct];
            }
            updatedCart.totalPrice = cart.totalPrice + +productPrice;
            writeCartToFile(updatedCart, cb);
        });
    };

    static deleteProductById(id, productPrice, cb) {
        fs.readFile(p, (err, fileContent) => {
          if (err) {
            cb();
            return;
          }
          const updatedCart = { ...JSON.parse(fileContent) };
          const product = updatedCart.products.find(prod => prod.id === id);
          if (!product) {
              cb();
              return;
          }
          const productQty = product.qty;
          updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
          );
          updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;
    
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
          cb();
        });
      }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err){
                console.log(err);
                const cart = { products: [], totalPrice: 0 };
                cb(cart, err);
            } else {
                cb(JSON.parse(fileContent), null);
            };
        });
    };
};

