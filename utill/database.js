const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;

const mongoConnect = calback => {
    MongoClient.connect('mongodb+srv://denitsa:0603030072@cluster0-xkijh.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        calback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
};

module.exports.getDb = getDb;
module.exports.mongoConnect = mongoConnect;