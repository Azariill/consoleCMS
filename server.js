const db = require('./config/connection');
const Database = require('./utils/database');
const {showAll ,updateRoles ,updateDepartments} = require('./utils/queries');

const departments = updateDepartments();
const roles = updateRoles();
const employees = [];




db.connect(err => {
  if (err) throw err;
  
  let database = new Database();
  updateRoles();

  return database.init();
 
});




