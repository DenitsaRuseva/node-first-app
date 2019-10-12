const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const mongoConnect = require('./utill/database').mongoConnect;

// const Product = require('./models/product');
const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5da25c1a5c9c991388bd88e1')
    .then(user => {
        req.user = user;
        console.log(user);
        next();
    }).catch(err => {
        console.log(err);
        next();
    });
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);



mongoConnect(() => {
    app.listen(3000);
});



// app.listen(3000);

