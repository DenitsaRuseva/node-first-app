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
    constructor(title){
        this.title = title
    }

    save(){
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