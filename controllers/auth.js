const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { validationResult } = require('express-validator');


const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

exports.getLogin = (req, res) => {
    // let message = req.flash('error');
    // if (message.length > 0) {
    //     message = message[0];
    // } else {
    //     message = null;
    // }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: null,
        oldInput: {
          email: '',
          password: ''
        },
        validationErrors: []
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: errors.array()[0].msg,
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: errors.array()
      })
    };
    User.findOne({email: email})
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
        return req.session.save(err => {
        res.redirect('/'); 
        console.log(err);
      });
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
};

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    res.redirect('/');
};

exports.getSignup = (req, res) => {
    // let message = req.flash('error');
    // if(message.length > 0){
    //     message = message[0]
    // } else {
    //     message = null;
    // }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: null,
        oldInput: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        validationErrors: []
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          password: password,
          email: email,
          confirmPassword: confirmPassword
        },
        validationErrors: errors.array()
    });
    };
    bcrypt.hash(password, 12)
    .then(pass => {
            const user = new User({
                email: email,
                password: pass,
                cart: { items: [] }
            });
            return user.save()
            .then(result => res.redirect('/login'));
    })
    .catch(err => {
      const error = new Error(err);
      return next(error);
  });
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/reset', {
      path: '/reset',
      pageTitle: 'Reset Password',
      errorMessage: message
    });
  };
  
  exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect('/reset');
      }
      const token = buffer.toString('hex');
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            req.flash('error', 'No account with that email found.');
            return res.redirect('/reset');
          }
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        })
        .then(result => {
          res.redirect('/');
          transporter.sendMail({
            to: req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Password reset',
            html: `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            `
          });
        })
        .catch(err => {
          const error = new Error(err);
          return next(error);
      });
    });
  };
  
  exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
      .then(user => {
        let message = req.flash('error');
        if (message.length > 0) {
          message = message[0];
        } else {
          message = null;
        }
        res.render('auth/new-password', {
          path: '/new-password',
          pageTitle: 'New Password',
          errorMessage: message,
          userId: user._id.toString(),
          passwordToken: token
        });
      })
      .catch(err => {
        const error = new Error(err);
        return next(error);
    });
  };
  
  exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;
  
    User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/login');
      })
      .catch(err => {
        const error = new Error(err);
        return next(error);
    });
  };

