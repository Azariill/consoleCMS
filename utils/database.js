

const inquirer = require('inquirer');
const db = require('../config/connection');
const {showAll ,updateRoles ,updateDepartments, updateEmployees} = require('./queries');


class Database{
    constructor(){
        this.deparments=[];
        this.employees =[];
        this.roles = [];
        
    }
    init(){
        
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
        db.query(`SELECT * FROM employees`,(err,res)=> {
            let arry = [];
            if(err){
                console.log(err);
            }
            if(res){ 
                res.map(x =>{
                    const {first_name, last_name} = x;
                    arry.push(first_name + last_name);
                });
            };
            this.employees = arry;
        });
        
        
        
       

        // initial prompts 
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices:['View all departments', 'View all employees','View all roles','Add a deparment','Add a role','Add an employee','Update an employee role']
        })
        .then(( {choice} ) =>{
           
            switch(choice){
                case 'View all departments':
                    this.viewDepartments();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'View all roles':
                    
                    this.viewRoles();
                    break;
                case 'Add a deparment':
                    this.addDepartment();
                    break;
                case 'Add a role':
                    this.addRole();
                    break;
                case 'Add an employee':
                    
                    this.addEmployee();
                    break;

            }
        })


    }

    viewDepartments(){
        showAll('departments');
        return this.init();
    };

    viewEmployees(){
        showAll('employees');
        return this.init();
    };
    viewRoles(){  
        showAll('roles');
        return this.init();
    }
    addDepartment(){
        const sql = `INSERT INTO departments (department_name) VALUES (?)`
        inquirer.prompt({
            type:'input',
            message:'What is the name of the department you would like to add?',
            name: 'addDepartment'
        })
        .then(({addDepartment}) => {

            db.query(sql,addDepartment, (err, result)=>{
                if(err){
                    console.log(err)
                }

                console.log(`\n\n${addDepartment} has been successfully added! \n \n`);

            });
        });
        updateDepartments();
        return this.init;
    };
    addRole(){
        const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES (?,?,?)`
        
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
            
            let {role, department_id, salary} = roleData;

            
            
             
             db.query(`SELECT id FROM departments WHERE department_name ='${department_id}'`,(err, result) =>{
                 if(err){
                    console.log(err)
                }
                let {id} = result[0];
                let parms = [role,id,salary];
                db.query(sql,parms,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(`The new role for ${role} has been succesfully added`);
                    return this.init();
                })
               
             })
             
         });
         
    };
    addEmployee(){
        
            const sql = `INSERT INTO employees (first_name, last_name, job_title_id, manager) VALUES (?,?,?,?)`
            
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
                console.log(employeeData);
                let {first_name, last_name,job_title_id, manager} = employeeData;
                console.log(job_title_id);
                
                
                 
                 db.query(`SELECT department_id FROM roles WHERE job_title ='${job_title_id}'`,(err, result) =>{
                     if(err){
                        console.log(err)
                    }
                    
                    let {department_id} = result[0];
                    let parms = [first_name,last_name,department_id,manager];
                    db.query(sql,parms,(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        console.log(`The new employee ${first_name + last_name} has been succesfully added`);
                        return this.init();
                    })
                   
                 })
                 
               
             });
             
        
    };

}

module.exports = Database;