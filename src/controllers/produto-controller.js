'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/produto-repository');

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

exports.getByDescricao = async(req, res, next) => {
    //console.log('descricao = ' );
    try {
        var data = await repository.getByDescricao(req.body.descricao);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.descricao, 3, 'Descrição Produto é obrigatório');

    // Verifica se os dados são invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.put = async(req, res, next) => {
    var produto = {
        _id: req.body._id,
        descricao: req.body.descricao,
        dataAtualizacao: Date.now()
    }

    //console.log('_id  = ' + produto._id);
    //console.log('descricao = ' + produto.nome);
    //console.log('dataAtualizacao = ' + produto.dataAtualizacao);

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
        await repository.update(produto._id, produto);
        res.status(200).send(produto);
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
            message: 'Produto removido com sucesso!'
        });
    } catch (error) {
        res.status(400).send({ 
            message: 'Falha ao remover o produto '
        });
    }
};