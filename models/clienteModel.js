var sqlite = require('sqlite3').verbose();
var banco = new sqlite.Database('C:/ProjetosNode/DrinkEveryApi/drinkEveryBd.db');

var modeloCliente = function () {}; // cria um prototype

modeloCliente.prototype.login = function(args, callback){
    var sql = 'SELECT Identificador, Email, Senha, Nome, SobreNome, CPF FROM CLIENTE WHERE Email = $email AND Senha = $senha LIMIT 1;'
    
    console.log(sql);
    console.log(args);

    banco.all(sql, {$email: args.email, $senha: args.senha}, function(err, rows){
        console.log(rows);
        console.log(err);
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}

modeloCliente.prototype.select = function(args, callback){
    var sql = 'SELECT Identificador, Email, Senha, Nome, SobreNome, CPF FROM CLIENTE;'
    banco.all(sql, {}, function(err, rows){
        console.log('erro: ' + err);
        if(rows != undefined && rows.length > 0){
            console.log('resultado: ' + rows);
            callback(rows);
        }
        else
            callback(0);
    });

    //banco.close();
}

modeloCliente.prototype.insert = function(args){
    banco.serialize(function(){
        banco.run("insert into CLIENTE (Email, Senha, Nome, SobreNome, CPF) values ($email, $senha, $nome, $sobreNome, $cpf)",
                    {$email: args.email, $senha: args.senha, $nome: args.nome, $sobreNome: args.sobrenome, $cpf: args.cpf},
                    function(error){
                        console.log(error);
                    });
    });

    banco.close();
}

module.exports = modeloCliente; // torna o prototype com as funcoes possivel de ser importado 
