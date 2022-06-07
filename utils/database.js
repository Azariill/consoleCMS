
// require inquirer for prompting 
const inquirer = require('inquirer');
// route database connections
const db = require('../config/connection');
// require query handling function
const {showAll} = require('./queries');

// assign database class
class Database{
    constructor(){
        // holds deparments
        this.deparments=[];
        // holds current employees
        this.employees =[];
        // holds roles
        this.roles = [];     
    }
    init(){
        
        
        // grabs the most recent deparment info and sets it to this. deparments
        db.query(`SELECT * FROM departments`,(err,res)=> {
            let arry = [];
            if(err){
                console.log(err);
            }
            if(res){ 
                res.map(x =>{
                    const {department_name} = x;
                    arry.push(department_name);
                });
            };
            this.deparments = arry;
        });
        // grabs the most recent role info and sets it to this.roles
        db.query(`SELECT * FROM roles`,(err,res)=> {
            let arry = [];
            if(err){
                console.log(err);
            }
            if(res){ 
                res.map(x =>{
                    const {job_title} = x;
                    arry.push(job_title);
                });
            };
            this.roles = arry;
        });
        // grabs the most recent employee info and sets it to the employee consturctor
        db.query(`SELECT * FROM employees`,(err,res)=> {
            let arry = [];
            if(err){
                console.log(err);
            }
            if(res){ 
                res.map(x =>{
                    const {first_name, last_name} = x;
                    arry.push(first_name + " " + last_name);
                });
            };
            this.employees = arry;
        });

        // initial prompts  asking person what they would like to do
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices:['View all departments','View all roles','View all employees','Add a deparment','Add a role','Add an employee','Update an employee role']
        })
        // takes that choice and runs it through a switch
        .then(( {choice} ) =>{
           // directs traffic based on what is chosen on first prompt
            switch(choice){
                case 'View all departments':
                    console.clear();
                    this.viewDepartments();
                    break;
                case 'View all employees':
                    console.clear();
                    this.viewEmployees();
                    break;
                case 'View all roles':
                    console.clear();
                    this.viewRoles();
                    break;
                case 'Add a deparment':
                    console.clear();
                    this.addDepartment();
                    break;
                case 'Add a role':
                    console.clear();
                    this.addRole();
                    break;
                case 'Add an employee':
                    console.clear();
                    this.addEmployee();
                    break;
                case 'Update an employee role':
                    console.clear();
                    this.upDateEmployeeRole();
                    break;

            }
        })
    }
 //Does a mysql SELECT * FROM ? search for deparments return initial prompt
    viewDepartments(){
        showAll('departments');
        this.init();
    };
//Does a mysql SELECT * FROM ? search for employees return initial prompt
    viewEmployees(){
        showAll('employees');
        return this.init();
    };
//Does a mysql SELECT * FROM ? search for roles return initial prompt
    viewRoles(){  
        showAll('roles');
        return this.init();
    }
    // function that allows adding of a dependant
    addDepartment(){
        // Prompts for a name for the new deparment
        inquirer.prompt({
            type:'input',
            message:'What is the name of the department you would like to add?',
            name: 'addDepartment'
        })
        // if a name is given then it returns to a query
        .then(({addDepartment}) => {
            // Insert query to enter new deparment in
            const sql = `INSERT INTO departments (department_name) VALUES (?)`
            //does an intert into the deparment table using the addDeparment info
            db.query(sql,addDepartment, (err, result)=>{
                if(err){
                    console.log(err)
                       }
                    console.log(`\n\n${addDepartment} has been successfully added! \n \n`);
                     // returns the starting prompt again
                    return this.init();
                });
            });
   
        };
// function for adding role
    addRole(){
      // prompts for role, department_id  and salary
        inquirer.prompt([
            
            {
                type:'input',
                message:'What is the name of the role you would like to add?',
                name: 'role'
            },
            {
                type:'list',
                name: 'department_id',
                message: 'What department is it part of?',
                choices: this.deparments
            },
            {
                type:'input',
                message: 'What is the salary for this role?',
                name: 'salary'
            }
        ])
        .then((roleData) => {
            // deconstructions data to be easily used in query
            let {role, department_id, salary} = roleData;

            
            
             // first queries to find the id from the deparments table that matches the name given
             db.query(`SELECT id FROM departments WHERE department_name ='${department_id}'`,(err, result) =>{
                 if(err){
                    console.log(err)
                        }
                     // query formatting to intert role 
                    const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?,?,?)`
                    // deconstructs id variable from result
                    let {id} = result[0];
                    // params variable for new query
                    let parms = [role,id,salary];
                    // Insert query
                    db.query(sql,parms,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    // console log success and restart init
                    console.log(`The new role for ${role} has been succesfully added`);
                    return this.init();
                })
               
             })
             
         });
         
    };
// function for adding employee
    addEmployee(){
        //inquirer prompt for first_name, last_name, job title and manager           
            inquirer.prompt([
                
                {
                    type:'input',
                    message:'What is the first name of the employee?',
                    name: 'first_name'
                },
                {
                    type:'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee?',
        
                },
                {
                    type:'list',
                    message: 'What is the employees job title?',
                    name: 'job_title_id',
                    choices: this.roles
                },
                {
                    type:'input',
                    message:'Who is the employees manager? If no one leave blank',
                    name: 'manager'
                }
            ])
            .then((employeeData) => {
              // deconstructs the new employee data
                let {first_name, last_name,job_title_id, manager} = employeeData;
              // first query the roles table for deparment id based on job title given
                 db.query(`SELECT id FROM roles WHERE job_title ='${job_title_id}'`,(err, result) =>{
                     if(err){
                        console.log(err)
                    }
                    // sql formatting for insert
                    const sql = `INSERT INTO employees (first_name, last_name, job_title_id, manager) VALUES (?,?,?,?)`
                    // deparment id deconstruction from first query
                    let {id} = result[0];
                    // params variable for next query
                    let parms = [first_name,last_name,id,manager];
                    // insert query for new employee
                    db.query(sql,parms,(err,result)=>{
                        console.log(`The new employee ${first_name + last_name} has been succesfully added`);
                        return this.init();
                    })
                   
                 })
            });
        };
    upDateEmployeeRole(){
                        if(err){
                            console.log(err);
                        }
                       
        // inquirer prompt to ask which employee they would like to update and with what role
        inquirer.prompt([
                
            {
                type:'list',
                message:'Which employee would youlike to update?',
                name: 'employees',
                choices: this.employees
            },
            {
                type:'list',
                message: 'What is their new job title?',
                name: 'job_title_id',
                choices: this.roles
            },
        
        ])
        .then((employeeData) => {
            // deconstruct data given
            let {employees, job_title_id} = employeeData;
            // spilt the concat name into two parts
            let nameArry = employees.split(' ');
            // grab only the last name
            const last_name = nameArry[1];
            // query for id of rol
            db.query(`SELECT id FROM roles WHERE job_title ='${job_title_id}'`,(err, result) =>{
                     if(err){
                        console.log(err)
                    }
                    
                    // employees SET job_title_id = ?
                        let {id} = result[0];
                    // params for query
                        let params = [id, last_name];
                    // sql formatted string
                        const sql = `UPDATE employees SET job_title_id = ? WHERE last_name = ?`;
                        
                    // query the database to update
                    db.query(sql, params,(err,res) => {
                        if(err){console.log(err)}
                
                        else{
                            
                            console.log(`${job_title_id} was succesfully updated!`);
                            }
                            return this.init();
                        });
                    });
                })};
}

module.exports = Database;