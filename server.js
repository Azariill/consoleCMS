const db = require('./config/connection');
const Database = require('./utils/database');
const {showAll ,updateRoles ,updateDepartments} = require('./utils/queries');



const roles = updateRoles().then(result => result);

const departments = updateDepartments();

const employees = [];




db.connect(err => {
  if (err) throw err;
  console.log(roles);
  let database = new Database(roles);

  return database.init();
 
});




// https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node