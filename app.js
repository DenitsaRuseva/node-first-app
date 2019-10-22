const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');


const User = require('./models/user');

const MONGODB_URL = 'mongodb+srv://denitsa:0603030072@cluster0-xkijh.mongodb.net/shop?retryWrites=true&w=majority';


const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
);

// app.use((req, res, next) => {
//     User.findById('5da5b0b0b8d1c7070861a516')
//       .then(user => {
//         req.user = user;
//         next();
//       })
//       .catch(err => console.log(err));
//   });



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404Page);

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
        app.listen(3000);
    })
.catch(err => console.log(err));

