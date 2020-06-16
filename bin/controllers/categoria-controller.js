'use strict'

const repository = require('../repositories/categoria-repository');
const validation = require('../helpers/validation');
const ctrlBase = require('../base/controller-base');
const _repo = new repository();
const jwt = require('jsonwebtoken') ;
const variables = require('../configuration/variables');


function categoriaController(){

}

categoriaController.prototype.post = async (req,res) =>{

    const _validationContact = new  validation();
    _validationContact.isRequired(req.body.nome,'Informe o nome da categoria');

  
    ctrlBase.post(_repo,_validationContact,req,res);
   
};

categoriaController.prototype.put = async (req,res) =>{

    const _validationContact = new  validation();
    _validationContact.isRequired(req.body.nome,'Informe o nome da categoria');  
    _validationContact.isRequired(req.params.id,'O Id é obrigatório');
  
    ctrlBase.put(_repo,_validationContact,req,res);
};

categoriaController.prototype.get = async (req,res) =>{
    ctrlBase.get(_repo,req,res);
};

categoriaController.prototype.getById = async (req,res) =>{
    ctrlBase.getById(_repo,req,res);
};

categoriaController.prototype.delete = async (req,res) =>{
    ctrlBase.delete(_repo,req,res);
  
};


module.exports = categoriaController;