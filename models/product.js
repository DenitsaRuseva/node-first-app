const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description){
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), error => {
                console.log(error);
            });
        });
    };

    static fetchAll(cb){
        getProductsFromFile(cb);
    };
};