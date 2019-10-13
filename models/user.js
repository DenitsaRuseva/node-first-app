const mongodb = require('mongodb');
const getDb = require('../utill/database').getDb;


class User {
    constructor(name, email, id, cart){
        this.name = name,
        this.email = email,
        this._id = id ? new mongodb.ObjectID(id) : null,
        this.cart = cart // {items: [{productId: 0, quantity: 1}, {}]}
    };

    save(){
        const db = getDb();
        if(this._id){
            throw 'User exist'; 
        }
        return db.collection('users').insertOne(this)
        .then(result => console.log('USER REGISTERED'))
        .catch(err => console.log(err));
    };

    addToCart(id, price){
        const updatedCartItems = [...this.cart.items];
        const cartProductIndex = this.cart.items.findIndex(i => {
           return new mongodb.ObjectID(i.productId).toString() === id.toString();
        });
        let newQuantity = 1;
        const newTotalPrice = this.cart.totalPrice + +price;
        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectID(id),
                quantity: 1
            });
        };
        const updatedCart = {
            items: [...updatedCartItems],
            totalPrice: newTotalPrice
        };
        const db = getDb();
        return db.collection('users')
        .updateOne(
            {_id: new mongodb.ObjectID(this._id)},
            {$set: {cart: updatedCart}}
        );
    };

    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({_id: new mongodb.ObjectID(id)})
    };
}

module.exports = User;