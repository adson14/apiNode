exports.post = async(repository,validationContact,req,res) =>{

    try {
        let data = req.body;
        if(!validationContact.isValid()){
            res.status(400).send({message:'Existem dados inválidos na sua requisição',
            validation: validationContact.errors()}).end();
            return;
        }

        let resultado = await repository.create(data);
        res.status(201).send(resultado);
    } catch (err) {
        console.error('Post com erro, motivo: ',err);
        res.status(500).send({message:'Erro no processamento', error:err})
    }
};

exports.put = async(repository,validationContact,req,res) =>{
    
    try {
        let data = req.body;
        if(!validationContact.isValid()){
            res.status(400).send({message:'Existem dados inválidos na sua requisição',
            validation: validationContact.errors()}).end();
            return;
        }

        let resultado = await repository.update(req.params.id,data);
        res.status(202).send(resultado);
    } catch (err) {
        console.error('Put com erro, motivo: ',error);
        res.status(500).send({message:'Erro no processamento', error:err})
    }
};

exports.get = async(repository,req,res) =>{
    
    try {
        let data = await repository.getAll();        
        res.status(201).send(data);
    } catch (err) {
        console.error('Get com erro, motivo: ',error);
        res.status(500).send({message:'Erro no processamento', error:err})
    }
};

exports.getById = async(repository,req,res) =>{
    let id = req.params.id;
    try {
        if(id){
            let data = await repository.getById(id);        
            res.status(200).send(data);
        }else{
            res.status(400).send({message: 'O id do item precisa ser informado'})
        }
      
    } catch (err) {
        console.error('GetBiId com erro, motivo: ',error);
        res.status(500).send({message:'Erro no processamento', error:err})
    }
};

exports.delete = async(repository,req,res) =>{
   try {

    let id = req.params.id;

    if(id){
        let data = await repository.delete(id);        
        res.status(200).send({message:'Registro excluído com sucesso'});
    }else{
        res.status(400).send({message: 'O id do item precisa ser informado'})
    }
   } catch (err) {
    console.error('Delete com erro, motivo: ',error);
    res.status(500).send({message:'Erro no processamento', error:err})
   }
};