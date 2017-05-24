var express = require('express');
var app = express();
var cliente = require('./controllers/cliente')

// Habilita o CORS para aplicação
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use('/cliente', cliente);

app.get('/', function(req, res){
    res.send('Hello World! Eu sou api do drinkEvery!');
});

app.listen(3000, function(){
    console.log('api executando na porta 3000');
});