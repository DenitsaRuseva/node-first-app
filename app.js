const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');


const User = require('./models/user');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5da5992715f10715041700da')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });



app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://denitsa:0603030072@cluster0-xkijh.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne()
    .then(user => {
        if(!user){
            const user = new User({
                name: 'Denitsa',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
        app.listen(3000);
    })
}).catch(err => console.log(err));
// mongoConnect(() => {
//     app.listen(3000);
// });


// app.listen(3000);

