var express = require('express');
var rota = express.Router();
var bodyParser = require('body-parser'); // Pra popular o req.body ¬_¬
var modelo = require('../models/clienteModel'); // Tem q ser o nome do arquivo!
var query = new modelo(); 

// Parser para application/x-www-form-urlencoded
var parserForm = bodyParser.urlencoded({extended: false}); 

rota.get('/login/:email-:senha', function(req, res){
    // Logar usuario
    var argumentos = {
        email: req.params.email,
        senha: req.params.senha
    };
    
    query.login(argumentos, function(result){
        console.log(result);
        if(result != 0)
            res.status(200).json(result);
        else
            res.status(500).json({}); // Se não encontrar usuario retonar status 500 e json vazio
    });
});

rota.post('/cadastrar', parserForm, function(req, res){
    // Inserir novo cliente no banco
    var cliente = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        cpf: ''
    };
    
    console.log(cliente);

    query.insert(cliente);
    res.status(200).send('Cliente inserido na base');

});

module.exports = rota;