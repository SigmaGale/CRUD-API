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
  //----------------API ENDPOINTS--------------------

//HOMEPAGE
app.get('/',(req,res)=>{
  
      con.query("SELECT * FROM items", function (err, result, fields) {
        if (err) throw err;
         data = result;
        res.render('index.ejs',{
          message:""
        });
      });
});


//GET SPECIFIC ITEM
app.get('/api/inventory/items/',(req,res) =>{
        
        con.query("SELECT * FROM items WHERE id ='"+ req.query.id + "';", function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
        

    });

//INSERT INTO DATABASE USING PUT
app.post('/api/inventory/items',(req,res) =>{
  
  if(req.query.name.length <= 2)
  {
    res.send({message:"Name must be greater than 2 characters"});
    return;
  }
  
  if(req.query.qty <= 0)
  {

    res.send({message:"Please input Quantity"});
    return;
  }
  if(req.query.amount <= 0)
  {
    res.send({message:"Please input amount"});
    return;
  }
 
  con.query("INSERT INTO items(name,qty,amount) VALUES ('"+req.query.name+"',"+req.query.qty+","+req.query.amount+");",(err,result) =>{
    if(err) {
      res.status(404).end();
      throw err
    
    };
    data = result;
    
      {
        message: "INSERTED new Item" 
      };

    res.send({message:"Successully inserted"});
    res.end();
    
  });
  
});
//UPDATE USING PUT
app.put('/api/inventory/items/',(req,res) =>{

  
  item = {
    id:req.query.id,
    name: req.query.name,
    qty:req.query.qty,
    amount:req.query.amount
    };
  con.query("UPDATE items SET name='"+item.name+"',qty = '"+item.qty+"', amount = '"+item.amount+"' WHERE id = "+req.query.id+";"
  ,(err,result) =>{

    if(err) throw err;
      res.send({message:"Update Success"});
    
  }
  );
});


//DELETE USING DELETE
app.delete('/api/inventory/items/',(req,res)=>{

  if(req.query.id <= 0){
    res.send('Please insert id')
  }
  con.query("DELETE FROM items WHERE id = "+req.query.id,(err,result) =>{
    if(err) throw err;
    data = result;
    res.render('index.ejs',{
      message:"DELETED"
    });
    
    });
});