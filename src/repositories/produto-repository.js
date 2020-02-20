'use strict';

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.getAll = async() => {
    const res = await Produto.find({});
    return res;
}

exports.getByDescricao = async(desc) => {
    const res = await Produto
    .find( { descricao: desc });
    return res;
}

exports.create = async(data) => {
    var produto = new Produto(data);
    await produto.save(); 
}

exports.update = async(id, data) => {
    await Produto
        .findByIdAndUpdate(id, {
            $set: {
                descricao: data.descricao,
                dataAtualizacao: Date.now()
            }
        });
    
}

exports.delete = async(id) => {
    await Produto
        .findByIdAndRemove( id );
}