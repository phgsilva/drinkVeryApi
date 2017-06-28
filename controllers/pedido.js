var express = require('express');
var rota = express.Router();
var bodyParser = require('body-parser'); // Pra popular o req.body ¬_¬
var modeloPedido = require('../models/pedidoModel'); // Tem q ser o nome do arquivo!
var query = new modeloPedido();
// Parser para application/x-www-form-urlencoded
var parserForm = bodyParser.urlencoded({extended: false}); 
// Parser para application/json
var parserJson = bodyParser.json({});


rota.post('/cadastrar', parserJson, function(req, res){
    var pedido = {
        id_cliente: req.body.id_cliente, 
        data: req.body.data, 
        hora: req.body.hora, 
        situacao: req.body.situacao, 
        totalPedido: req.body.totalPedido, 
        id_fornecedor: req.body.id_fornecedor,
        itensPedido: req.body.itensPedido
    }

    console.log(req.body);
    console.log(pedido);

    query.insert(pedido);
    
    res.end();
});

rota.get('/buscar/cliente/:id_cliente', function(req, res){
    var argumento = { id_cliente: req.params.id_cliente };

    query.selectPorCliente(argumento, function(result){
        if(result != 0)
            res.status(200).json(result);
        else
            res.status(500).json({});
    });
});

rota.get('/buscar/fornecedor/:id_forncecedor', function(req, res){
    var argumento = { id_forncecedor: req.params.id_forncecedor };

    query.selectPorFornecedor(argumento, function(result){
        if(result != 0)
            res.status(200).json(result);
        else
            res.status(500).json({});
    });
});

module.exports = rota;