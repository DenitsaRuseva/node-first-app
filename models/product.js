const fs = require('fs');
const path = require('path');

const Cart = require('../models/cart');

const rootPath = require('../utill/path');

const p = path.join(rootPath, 'data', 'products.json'); 

const getProductsFromFile = cb => {
    fs.readFile(p, (error, fileContent) => {
        if(error){
          cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description){
        this.id = id,
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save(){
        if(!this.id){
            this.id = Math.random().toString();
            getProductsFromFile(products => {
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), error => {
                    console.log(error, 'In save Product method if block');
                });
            });
        } else{
            getProductsFromFile(products => {
                const updatedProductIndex = products.findIndex(p => p.id === this.id);
                let updatedProducts = [...products];
                updatedProducts[updatedProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err, 'In save Product method else block');
                });
            });
        };
    };

    static fetchAll(cb){
        getProductsFromFile(cb);
    };

    static findById = (id, cb) => {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    };

    static deleteById(id, cb){
        getProductsFromFile(products => {
            let newProducts = [...products];
            const product = newProducts.find(p => p.id === id); 
            newProducts = newProducts.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(newProducts), err => {
                if(err){
                console.log(err, 'In deleteById Product method');
                } else {
                    cb();
                }
            });
        });
    };
};