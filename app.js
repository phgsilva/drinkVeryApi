var express = require('express');
var app = express();
var cliente = require('./controllers/cliente')

app.use('/cliente', cliente);

app.get('/', function(req, res){
    res.send('Hello World! Eu sou api do drinkEvery!');
});

app.listen(3000, function(){
    console.log('api executando na porta 3000');
});