
const db = require('../config/connection');
const Database = require('./database');

module.exports = {
// show all queries function 
 showAll(table){
  //set sql format variable to empty string
    let sql = ``;
   // switch statement for queries depending on what is passed into function
    switch(table){
        case 'departments':
            sql = `SELECT * FROM departments`;
            break;
        case 'roles':
            sql = `SELECT roles.id, roles.job_title , departments.department_name, roles.salary
                   FROM roles INNER JOIN departments ON roles.department_id = departments.id; `
            break;
        case 'employees':
            sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name, roles.salary, employees.manager
                   FROM employees INNER JOIN roles ON employees.job_title_id = roles.id
                   INNER JOIN departments ON roles.department_id = departments.id;`
            break;
      
    }
    
    
    db.query(sql,(err,res)=> {
        if(err){
            console.log(err);
            return this.init();
        }
      console.log('\n\n\n Press down arrow for options');
        console.table(res);
    });
  },

 
          

}