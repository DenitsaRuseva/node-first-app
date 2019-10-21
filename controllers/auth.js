const User = require('../models/user');

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};


exports.postLogin = (req, res) => {
    User.findById('5dadd2ddacf0381ad00e5343')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            req.session.isLoggedIn = false;
            res.redirect('/');
        });
    
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};

