
const jwt = require('jsonwebtoken');
const variables = require('../configuration/variables');

module.exports = async (req,res,next)=>{
    let token = req.body.token || req.query.query || req.headers['x-access-token'];

    if(token){
        try {
            let decoded = await jwt.verify(token,variables.Security.secretKey);
            console.log(decoded);
            req.usuarioLogado = decoded;
            next();
        } catch (error) {
            res.status(401).send({message: 'Token informado é inválido!'});
            return;
        }
    }else{
      res.status(401).send({message:'Necessário obter o token de autorização'});
      return;    
    }
     
};