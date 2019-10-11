const Sequelize = require('sequelize');

const sequelize = require('../utill/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autooIncrement: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;