
const inquirer = require('inquirer');
const db = require('../config/connection');

class Database{
    constructor(){
        this.deparments = []
        this.roles = [];
        this.employees =[];
    }

    
  

    init(){
        // finds existing departments and sets them to this.deparments in constructor
        db.query(`SELECT * FROM departments`,(err,res)=> {
            let arry = [];
            if(err){
                console.log(err);
            }
            res.map(x =>{
                const {department_name} = x;
                
                arry.push(department_name);
                
            })
            this.deparments = arry;
            ;});

        

        // initial prompts 
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to do?',
            name: 'choice',
            choices:['View all departments', 'View all employees','Add a deparment','Add a role','Add an employee','Update an employee role']
        })
        .then(( {choice} ) =>{
           
            switch(choice){
                case 'View all departments':
                    this.viewDepartments();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'Add a deparment':
                    this.addDepartment();
                    break;
                case 'Add a role':
                    this.addRole();
                    break;

            }
        })
    }

    viewDepartments(){
        const sql = `SELECT * FROM departments`;
        db.query(sql,(err,res)=> {
            if(err){
                console.log(err);
                return this.init();
            }
            console.table(res);
            return this.init()
        });
        
    };

    viewEmployees(){
        const sql = `SELECT * FROM employees`;
        db.query(sql,(err,res)=> {
            if(err){
                console.log(err);
                return this.init();
            }
            console.table(res);
           
            return this.init()
        });
        
    };
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
                return this.init();
            });
        });
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
            console.log(roleData);
            let {role, department_id, salary} = roleData;

            
            let newId;
             
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
                })
               
             })
         });
    };

}

module.exports = Database;