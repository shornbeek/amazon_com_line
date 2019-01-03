var mysql = require("mysql");
var enquirer

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "amazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
  });
  
  var query = connection.query('SELECT * FROM products;', function (error, results, fields) {
  
    // connection.query('SELECT * FROM songs WHERE artist="' + userInput + '"', function (error, results, fields) {
      if (error) throw error;
      for (let i =0; i < results.length; i++) {
    
  //   console.log(results[i])
    console.log(results[i].product_name)
    console.log(results[i].department_name)
    console.log(results[i].price)
    console.log(results[i].stock_quantity)
    // console.log(error)
  //   console.log(results[i].hungry)
    
     }
    });
    
    console.log(query.sql);