const {Model} = require("sequelize");
const {Type} = require("../db");

async function findType(tipo)  {
    const tipoID= await Type.findAll({
        where: {
            name: tipo
        }
    });
    const tipId= Promise.all(tipoID);
    return tipId
};

async function findType2(tipo) {
    const type= await findType(tipo);
    
    try{

        const typeId= await type.map(e => {
            return {
                id: e.id
            }
        })

        console.log(typeId);
       return typeId

    }catch(error){
       console.log(error);
    }
}

module.exports.findType2= findType2;