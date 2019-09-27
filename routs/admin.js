const express = require('express');
const path = require('path');

const rootPath = require('../utill/path');



const router = express.Router();

router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootPath, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
    res.redirect('/');
});


module.exports = router;