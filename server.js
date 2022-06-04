const express = require('express');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




// Query database
let deletedRow = 2;

db.query(`DELETE FROM books WHERE id = ?`, deletedRow, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log("\n \n This is the result : ",result ,"\n");

});

// Query database
db.query('SELECT * FROM books', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

