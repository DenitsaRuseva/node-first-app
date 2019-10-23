const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};


exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            req.flash('error', 'Invalid email!');
            res.redirect('/login');
        }
        bcrypt.compare(password, user.password)
        .then(result => {
            if(result){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            req.flash('error', 'Invalid password!');
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            req.flash('error', err);
            res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = (req, res) => {
    let message = req.flash('error');
    if(message.length > 0){
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });
};

exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
    .then(existingUser => {
        if(existingUser){
            req.flash('error', 'User email exist');
            return res.redirect('/signup');
        };
        return bcrypt.hash(password, 12)
        .then(pass => {
            const user = new User({
                email: email,
                password: pass,
                cart: { items: [] }
            });
            return user.save()
            .then(result => res.redirect('/login'));
        })
    })
    .catch(err => console.log(err));
};

