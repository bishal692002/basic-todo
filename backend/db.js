const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://admin:ruN6y9BBHwHG2lcY@cluster0.7hjutwb.mongodb.net/')


const todoSchema = mongoose.Schema({

title:String,
description:String,
completed:Boolean


})

const todo = mongoose.model('todos',todoSchema);

module.exports = {
    todo
}