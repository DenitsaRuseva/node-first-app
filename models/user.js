const mongoose = require('mongoose');
const Product = require('../models/product');

const Schema = mongoose.Schema;

const userShema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
      }, 
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

userShema.methods.addToCart = function(product){
  const updatedCartItems = [...this.cart.items];
  const productIndex = this.cart.items.findIndex(p => {
    return p._id.toString() === product._id.toString()
  });
  if(productIndex >= 0){
    updatedCartItems[productIndex].quantity = updatedCartItems[productIndex].quantity + 1;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1
    })
  }
  this.cart.items = [...updatedCartItems];
  return this.save();
};

module.exports = mongoose.model('User', userShema);


// const mongodb = require('mongodb');
// const getDb = require('../utill/database').getDb;


// class User {
//     constructor(name, email, id, cart){
//         this.name = name,
//         this.email = email,
//         this._id = id ? new mongodb.ObjectID(id) : null,
//         this.cart = cart ? cart : {
//           items: [],
//           totalPrice: 0
//         } // {items: [{productId: 0, quantity: 1}, {}]}
//     };

//     save(){
//         const db = getDb();
//         if(this._id){
//             throw 'User exist'; 
//         }
//         return db.collection('users').insertOne(this)
//         .then(result => console.log('USER REGISTERED'))
//         .catch(err => console.log(err));
//     };

//     addToCart(id, price){
//         const updatedCartItems = [...this.cart.items];
//         const cartProductIndex = this.cart.items.findIndex(i => {
//            return new mongodb.ObjectID(i.productId).toString() === id.toString();
//         });
//         let newQuantity = 1;
//         const newTotalPrice = this.cart.totalPrice + +price;
//         if(cartProductIndex >= 0){
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({
//                 productId: new mongodb.ObjectID(id),
//                 quantity: 1
//             });
//         };
//         const updatedCart = {
//             items: [...updatedCartItems],
//             totalPrice: newTotalPrice
//         };
//         const db = getDb();
//         return db.collection('users')
//         .updateOne(
//             {_id: new mongodb.ObjectID(this._id)},
//             {$set: {cart: updatedCart}}
//         );
//     };

//   getCart() {
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     });
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//   };


//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(result => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   };

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new mongodb.ObjectId(this._id) })
//       .toArray();
//   };

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new mongodb.ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//     static findById(id){
//         const db = getDb();
//         return db.collection('users')
//         .findOne({_id: new mongodb.ObjectID(id)})
//         .then(user => user)
//         .catch(err => console.log(err));
//     };
// }

// module.exports = User;