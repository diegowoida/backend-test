'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/cliente-repository');

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.getByName = async(req, res, next) => {
    //console.log('name = ' + req.body.nome);
    try {
        var data = await repository.getByName(req.body.nome);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.post = async(req, res, next) => {
    
    const cliente = {
        //_id: req.body._id,
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        dataCadastro: Date.now()
    }
    //var parsedCliente = JSON.parse(req.body);

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 1, 'Nome Cliente é obrigatório');
    
    // Verifica se os dados são invalidos
    if(!contract.isValid()){
        res.status(400).send({
            message: 'Nome Cliente é obrigatório'
        });
        return;
    }
    
    try {
        await repository.create(req.body);
        res.status(201).send(
            //{message: req.body.nome +' criado com sucesso'}
            //req.body
            cliente
        );
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao cadastrar o cliente!'
        });
    }
        
};

exports.put = async(req, res, next) => {
    var cliente = {
        _id: req.body._id,
        nome: req.body.nome,
        dataAtualizacao: Date.now()
    }

    //console.log('_id  = ' + cliente._id);
    //console.log('nome = ' + cliente.nome);
    //console.log('dataAtualizacao = ' + cliente.dataAtualizacao);
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body._id, 1, 'Id não foi informado');
    
    // Verifica se os dados são invalidos
    if(!contract.isValid()){
        res.status(401).send({
            message: 'Id não foi informado'
        });
        return;
    }

    try {
        await repository.update(cliente._id, cliente);
        res.status(200).send(cliente);
    } catch (error) {
        res.status(401).send({ 
            message: 'Id não foi informado'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ 
            message: 'Cliente removido com sucesso!'
        });
    } catch (error) {
        res.status(400).send({ 
            message: 'Falha ao remover o cliente'
        });
    }
};
