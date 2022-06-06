const db = require('./config/connection');
const Database = require('./utils/database');
const {showAll ,findJobTitle ,updateDepartments} = require('./utils/queries');







db.connect(err => {
  if (err) throw err;
  let currentRole = [];

  db.promise().query(`SELECT * FROM roles`)
  .then(results =>  findJobTitle(results[0]))
  .then(result => currentRole = result );
  
  console.log(currentRole);

  let database = new Database();

  return database.init();
 
});




// https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node