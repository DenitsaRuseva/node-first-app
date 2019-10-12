const mongodb = require('mongodb');
const getDb = require('../utill/database').getDb;


class User {
    constructor(name, email, id){
        this.name = name,
        this.email = email,
        this._id = id ? new mongodb.ObjectID(id) : null
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

    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({_id: new mongodb.ObjectID(id)})
    };
}

module.exports = User;