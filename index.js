//-------------EXPRESS------------//

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
app.use(express.json());

var PORT = process.env.PORT||4762;
app.listen(PORT);
console.log(PORT +' is the PORT');


//item Object
var item = {
  id:0,
  name:"",
  qty:0,
  amount:0
}




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




  //----------------Functions--------------------

//HOMEPAGE
app.get('/',(req,res)=>{
  
      con.query("SELECT * FROM items", function (err, result, fields) {
        if (err) throw err;
         data = result;
        res.render('index.ejs',{
          message:"GET"
        });
      });
  
});


//GET SPECIFIC ITEM
app.get('/api/inventory/items/:id',(req,res) =>{
        
        con.query("SELECT * FROM items WHERE id ='"+ req.params.id + "';", function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });

    });

app.post('/api/inventory/items',(req,res) =>{
  item = {
    name: req.body.name,
    qty:req.body.qty,
    amount:req.body.amount
    };
console.log(req.body.name);
 con.query("INSERT INTO items(name,qty,amount) VALUES ('"+item.name+"',"+item.qty+","+item.amount+");",(err,result) =>{
    if(err) throw err;
    data = result;
    res.render('index.ejs',{
      message:"INSERT SUCCESS"
    });
    
  });
  
});

app.put('/api/inventory/items/:id',(req,res) =>{

  item = {
    name: req.body.name,
    qty:req.body.qty,
    amount:req.body.amount
    };
  con.query("UPDATE items SET name='"+item.name+"',qty = '"+item.qty+"', amount = '"+item.amount+"' WHERE id = "+req.params.id+";"
  ,(err,result) =>{
    data = result;
    res.render('index.ejs',{
      message:"Update Success"
    })
  }
  );
});

app.delete('/api/inventory/items/:id',(req,res)=>{

  con.query("DELETE FROM items WHERE id = "+req.params.id,(err,result) =>{
    if(err) throw err;
    data = result;
    res.render('index.ejs',{
      message:"DELETED"
    });
    
    });
});