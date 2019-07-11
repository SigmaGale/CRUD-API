var express = require('express');
var app = express();

app.engine('html',require('ejs').renderFile)
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index');
});

app.listen(4762);
console.log('4762 is the server port');