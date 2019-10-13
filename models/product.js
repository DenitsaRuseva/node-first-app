const mongodb = require('mongodb');
const getDb = require('../utill/database').getDb;


class Product {
    constructor(title, imageUrl, price, description, id, userId){
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description,
        this._id = id ? new mongodb.ObjectID(id) : null //mongodb will create a id, which 
        // will be a special object /ObjectID/
        this.userId = new mongodb.ObjectID(userId) 
    }

   save(){
       const db = getDb();
       let dbOpr;
       if(this._id){
           dbOpr = db.collection('products').updateOne({_id: this._id}, {$set: this});
       } else {
           dbOpr = db.collection('products').insertOne(this);
       }
       return dbOpr
       .then(result => {
           console.log('PRODUCT SAVED');
       })
       .catch(err => console.log(err));
   };

   static fetchAll(){
       const db = getDb();
       return db.collection('products').find().toArray()
       .then(products => {
           return products;
       })
       .catch(err => console.log(err));
   };

   static findById(id){
       const db = getDb();
      return db.collection('products').find({_id: new mongodb.ObjectID(id)})
      .next()
      .then(product => product)
      .catch(err => console.log(err));
   };

   static deleteById(id){
       const db = getDb();
       return db.collection('products').deleteOne({_id: new mongodb.ObjectID(id)})
       .then(result => console.log('DELETED'))
       .catch(err => console.log(err));
   };
};

module.exports = Product;