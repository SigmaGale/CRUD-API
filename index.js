//-------------EXPRESS------------//

var express = require('express');
var app = express();

app.engine('html',require('ejs').renderFile)
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index');
});

app.listen(4762);
console.log('4762 is the server');

//----------------MYSQL CONNECTION-------------
var mysql = require('mysql');
var con = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"inventory"

    }
);



  //----------------TestFunction--------------------
  function test(){
      
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM items", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
}