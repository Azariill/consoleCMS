
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


           

}