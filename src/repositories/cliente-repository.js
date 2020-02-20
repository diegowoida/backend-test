'use strict';

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');
mongoose.set('useFindAndModify', false);

exports.getAll = async() => {
    const res = await Cliente.find({});
    return res;
}

exports.getByName = async(name) => {
    const res = await Cliente
    .find( { nome: name });
    return res;
}

exports.create = async(data) => {
    var cliente = new Cliente(data);
    await cliente.save(); 
}

exports.update = async(id, data) => {
    await Cliente
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                dataAtualizacao: Date.now()
            }
        });
    
}

exports.delete = async(id) => {
    await Cliente
        .findByIdAndRemove( id );
}
