require('../models/usuario-model');
const base = require('../base/repository-base');
const md5 = require('md5');


class usuarioRepository {
    constructor(){
        this._base = new base('Usuario');
        //Project especifica o que deve ser retornado 
        this._projection = 'nome email _id' ;
    }
    async isEmailExiste(Email){
        
        return await this._base._model.findOne({email:Email}, this._projection);
    }
    async autenticate(Email,Senha){
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({email:Email, senha:_hashSenha}, this._projection);
    }


    async create(data){
        let usuarioCriado = await this._base.create(data);
        return this._base._model.findById(usuarioCriado._id,this._projection)
    }

    async update(id,data){
     let usuarioAtualizado = await this._base.update(id,{
        nome: data.nome,
        email:data.email,
        foto:data.foto

     });
     return this._base._model.findById(usuarioAtualizado._id, this._projection);
    }

    async getAll(){
        return await this._base._model.find({}, this._projection);
    }

    async getById(id){
        return await this._base._model.findById(id, 'nome email _id foto endereco numero'
        +'complemento cidade bairro cep uf telefone tipo ')
    }

    async delete(id){
        return await this._base.delete(id);
    }
}


module.exports = usuarioRepository;