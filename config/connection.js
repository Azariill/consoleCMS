// import mysql to page 
const mysql = require('mysql2');
// variables for login
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'company_cms'
    },
    console.log('Connected to the company_cms database.'),
);

module.exports = db;