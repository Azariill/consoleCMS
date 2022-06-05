const db = require('./config/connection');
const Database = require('./utils/database');
const {showAll ,updateRoles ,updateDepartments} = require('./utils/queries');

const departments = updateDepartments();
const currentRoles = updateRoles();
const employees = [];

console.log(currentRoles);


db.connect(err => {
  if (err) throw err;
  
  let database = new Database(departments,currentRoles,employees);

  return database.init();
 
});




