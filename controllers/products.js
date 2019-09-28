const products = [];

exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Products',
        products: products,
        path: '/admin/add-product'
    })
};

exports.postAddProduct = (req, res) => {
    products.push({title: req.body.title})
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    res.render('shop', {
        pageTitle: 'Shop',
        path: '/',
        products: products
    });
};



