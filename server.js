const db = require('./config/connection');
const Database = require('./utils/database');



db.connect(err => {
  if (err) throw err;

  let database = new Database();

  return database.init();
 
});




