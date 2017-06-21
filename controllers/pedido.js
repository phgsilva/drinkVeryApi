var express = require('express');
var rota = express.Router();
var bodyParser = require('body-parser'); // Pra popular o req.body ¬_¬
var modeloPedido = require('../models/pedidoModel'); // Tem q ser o nome do arquivo!
var query = new modeloPedido();
// Parser para application/x-www-form-urlencoded
var parserForm = bodyParser.urlencoded({extended: false}); 
// Parser para application/json
var parserJson = bodyParser.json({});
