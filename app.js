const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouts = require('./routs/admin');
const routs = require('./routs/shop');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRouts);
app.use(routs);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);

