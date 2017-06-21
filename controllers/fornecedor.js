var express = require('express');
var rota = express.Router();
var bodyParser = require('body-parser'); // Pra popular o req.body ¬_¬
var modeloFornecedor = require('../models/fornecedorModel'); // Tem q ser o nome do arquivo!
var query = new modeloFornecedor();
// Parser para application/x-www-form-urlencoded
var parserForm = bodyParser.urlencoded({extended: false}); 
// Parser para application/json
var parserJson = bodyParser.json({});

rota.post('/cadastrar', parserJson, function(req, res){
    var fornecedor = {
        email: req.body.email,
        senha: req.body.senha,
        cnpj: req.body.cnpj,
        endereco: req.body.endereco,
        descricao: req.body.descricao
    }

    query.insert(fornecedor);
    
    res.end();
});

rota.get('/buscar', function(req, res){
    query.select({}, function(result){
        if(result != 0)
            res.status(200).json(result);
        else
            res.status(500).json({});
    });
});

rota.get('/buscar_produtos/:idFornecedor', function(req, res){
    var argumento = { idFonecedor: req.params.idFornecedor };

    query.selectProdutos(argumento, function(result){
        if(result != 0)
            res.status(200).json(result);
        else
            res.status(500);
    })

});




