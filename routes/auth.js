const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');


const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();


router.get('/login', authController.getLogin);


router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Plese enter a valid email address.')
    .normalizeEmail()
    .custom( value => {
        return User.findOne({email: value})
        .then(existingUser => {
            if(!existingUser){
                return Promise.reject('User with this email do not exist')
            } return true;
        })
    }),
    body('password')
    .custom((value, {req}) => {
        return User.findOne({email: req.body.email})
        .then(existindUser => {
           return bcrypt.compare(value, existindUser.password)
            .then(result => {
                if(result){
                    return true;
                } 
                return Promise.reject('Incorrect password!')

            })
        })
    })
], authController.postLogin);


router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', [ 
    body('email')
    .isEmail()
    .withMessage('Plese enter a valid email.')
    .normalizeEmail()
    .custom( value => {
        return User.findOne({email: value})
        .then(existingUser => {
        if(existingUser){
            return Promise.reject('Email alredy exist.')
        };
    })
    }),
    body('password', 
    'Please enter a password with only numbers and text and at least 5 characters.')
    .isLength({min: 6})
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Passwords have to match!');
        } return true;
    })
],
     authController.postSignup);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;