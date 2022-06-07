
const inquirer = require('inquirer');

const db = require('../config/connection');
const Database = require('./database');

module.exports = {

 showAll(table){
    const sql = `SELECT * FROM ${table}`;
    
    db.query(sql,(err,res)=> {
        if(err){
            console.log(err);
            return this.init();
        }
      console.log('\n\n\n Press down arrow for options');
      console.table(res);
    });
  },


updateRoles(){
    db.query(`SELECT * FROM roles`,(err,res)=>{
        
            if(err){
                    console.log(err)
                        }
            if(res){ 
                let arry = [];
                res.map(x =>{
                    const {job_title} = x;
                    arry.push(job_title);
                            });
                           
                        };
                        
                        this.roles = arry;
          
                    });       
                    return this.init();
}
,
updateEmployees(){
    db.query(`SELECT * FROM employees`,(err,res)=>{
        
            if(err){
                    console.log(err)
                        }
            if(res){ 
                let arry = [];
                res.map(x =>{
                    const {first_name,last_name} = x;
                    arry.push(first_name + last_name);
                            });
                           
                        };
                        
                       this.employees = arry;
          
                    });       
           
}
           

}