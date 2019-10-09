// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'first_schema',
//     password: 'password'
// });

// module.exports = pool.promise();



const Sequelize = require('sequelize');

const sequelize = new Sequelize('first_schema', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost' //this is optional?????
});

module.exports = sequelize;