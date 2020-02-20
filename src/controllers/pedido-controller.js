'use strict';

//const guid = require('guid');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/pedido-repository');


exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao consultar pedidos!'
        });
    }
}

exports.post = async(req, res, next) => {
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.cliente, 1, 'Cliente é obrigatório');
    
    // Verifica se os dados são invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    //console.log('_id  = ' + req.body.cliente);
    //console.log('produtos = ' + req.body.produtos);
    //console.log('dataAtualizacao = ' + cliente.dataAtualizacao);

    try {
        await repository.create({
            cliente: req.body.cliente,
            produtos: req.body.produtos
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar o pedido!'
        });
    }
        
};