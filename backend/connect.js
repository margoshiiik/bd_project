import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'margoshiiik', 
    database: 'bd_project'
  })

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });