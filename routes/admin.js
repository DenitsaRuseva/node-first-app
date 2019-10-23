const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.get('/add-product', isAuth, adminController.getAddProduct);
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product/:productId', isAuth, adminController.postEditProduct);

router.post('/delete-product/:productId', isAuth, adminController.postDeleteProduct);


router.get('/products', isAuth, adminController.getProducts);


module.exports= router;