
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
 updateDepartments(){

    // finds existing departments and sets them to this.deparments in constructor
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
        return arry;
    });

},

updateRoles(){
    var arry = [];
    // finds existing roles and sets them to this.deparments in constructor
    db.query(`SELECT * FROM roles`,(err,res)=>{
        if(err){
                        console.log(err);
                    }
        if(res){ 
            res.map(x =>{
                const {job_title} = x;
                arry.push(job_title);
                        });
                        console.log(arry);
                    };
                    console.log(arry);
                    return arry;
                });
}
            

}