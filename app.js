const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

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
        req.user = new User(user.name, user.email, user._id, user.cart);
        next();
      })
      .catch(err => console.log(err));
  });



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://denitsa:0603030072@cluster0-xkijh.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => app.listen(300))
.catch(err => console.log(err));

// mongoConnect(() => {
//     app.listen(3000);
// });



// app.listen(3000);

