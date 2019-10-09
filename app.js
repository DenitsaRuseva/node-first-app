const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const sequelize = require('./utill/database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //I do not need this, because by default node will search for 
                            //template in 'view' folder

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

sequelize.sync().then( result => app.listen(3000)).catch(err => console.log(err));


// app.listen(3000);

