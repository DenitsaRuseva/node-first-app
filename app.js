const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminData = require('./routs/admin');
const routs = require('./routs/shop');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //I do not need this, because by default node will search for 
                            //template in 'view' folder

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routs);
app.use(routs);

app.use((req, res) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);

