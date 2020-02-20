'use strict';

const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedido');

exports.get = async() => {
    var res = await Pedido.find({});
    return res;
}

exports.create = async(data) => {
    var pedido = new Pedido(data);
    await pedido.save(); 
}