
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

findJobTitle(arry){
    let newArry = [];
   
    arry.map(x => {
        const {job_title} = x;
        newArry.push(job_title);
        
        });
   
    return newArry;
    },






}