const { Router } = require('express');
const { Op, where, Model } = require("sequelize");
const { Pokemon, Type, pokemons_types } = require ("../db");
const { pokeDex2 } = require ("../controllers/allPokemons");
const { pokeDetail2 } = require("../controllers/pokemonDetail");
const {filtrado} = require("../controllers/filtrado");
const { findType2} = require("../controllers/findType");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const data= async () => {
    const arr = await axios.get("https://pokeapi.co/api/v2/type");
    return arr.data.results;
}
router.get("/pokemon/:id", async (req, res) => {
     const id = req.params.id;
     
     try{
         
         if(id.length > 8 ){
             
             const pokeId= await Pokemon.findByPk(id)
           
           res.status(200).send(pokeId)
           
       }else{
        const result= await pokeDetail2(id);
           res.status(200).send(result);
       }
     }catch(error){
        console.log(error.message);
        res.status(400).send({error: error.message});
     }
})

router.get("/type" , async (req, res) => {
     const tipos= await data();

     try{
      const allTypes= await Type.findAll();
      
      if(!allTypes.length){
        const mapeo= await tipos.map((t) => {
            return {
                name: t.name
            };
        });

        const createType= await Type.bulkCreate(mapeo);
        const created= await Type.findAll();
        res.status(200).send(created);
      }else{
        res.status(201).send(allTypes);
      }
     }catch(error){
        res.status(400).send({error: error.message});
     }
});

router.post("/pokemon/create", async (req, res) => {
    const {name, type, attack, defense, health, speed, height, weight} = req.body;
    const tipos= await findType2(type);
    const tipoId= await tipos.map(e => {
        const id= e.id;
        return id;
    })
    const tipo= [];
    tipo.push(type);
    
     console.log(tipos);
     console.log(tipoId);
        try{
          let poke= await Pokemon.create({
            name: name,
            type: tipo,
            attack: attack,
            defense: defense,
            health: health,
            speed: speed,
            height: height,
            weight: weight
        });
           
          await poke.setTypes(tipoId);
          res.status(201).send(poke);
        }catch(error){
            console.log(error.message);
          res.status(401).send({error: error.message})
        }
    
});

const nextPoke= async () => {
    const pokes= await axios.get("https://pokeapi.co/api/v2/pokemon");
    const siguiente= pokes.data.next;
    return siguiente;
}


router.get("/pokemon", async (req, res) => {
    const {name, filter, page, type, order, created}= req.query;
    const enlace= "https://pokeapi.co/api/v2/pokemon";
    const next= await nextPoke();
    const pokemonData= await pokeDex2(enlace);
    const pokemonData2= await pokeDex2(next);
    const pokePoke=[];
    const pokemonesNoCreados= [];
    
    try{
        
        if(!name){

            
            const pokeMap = await pokemonData.map((p) => {
                
                return {
                    id: p.id,
                    img: p.img,
                        name: p.name,
                        attack: p.attack,
                        types: p.types
                    }
                });
                
                const pokeMap2 = await pokemonData2.map((p) => {
                    
                    return {
                        id: p.id,
                        img: p.img,
                        name: p.name,
                        attack: p.attack,
                        types: p.types
                    }
                })   
                
                const allPoke= await Pokemon.findAll()
                
                const pokeHome= await allPoke.map(e => {
                    return {
                        id: e.id,
                        img: e.img,
                        name: e.name,
                        attack: e.attack,
                        types: e.type
                    }
                });

                if(created === "creado"){
                  try{

                      const filt= filtrado(pokeHome, filter, page, type, order);

                      res.status(200).send(filt)
                  }catch(error){
                    res.status(400).send({error: error.message})
                  }  

                }else if(created === "noCreado"){
                  pokemonesNoCreados.push(...pokeMap, ...pokeMap2);
                  try{

                      const filt= filtrado(pokemonesNoCreados, filter, page, type, order);

                      res.status(200).send(filt);
                  }catch(error){
                    res.status(400).send({error: error.message});
                  }
                }else{

                    pokePoke.push(...pokeMap, ...pokeMap2, ...pokeHome);
                    
                    try{
    
                    const filtrados= filtrado(pokePoke, filter, page, type, order);
                     
                      res.status(200).send(filtrados)
                }catch(error){
                    res.status(400).send({error: error.message});
                }
                }
                

        }else if(name){
            const pokeFind= await Pokemon.findAll({
                where: {
                    name: {
                        [Op.like]: "%" + name + "%"
                    }
                    
                }
             });
            const detalle= await pokeFind.map(e => {
                return {
                    name:e.name,
                    type: e.type,
                    attack: e.attack,
                    defense: e.defense,
                    health: e.health,
                    speed: e.speed,
                    height: e.height,
                    weight: e.weight,
                    img: e.img
                }
            })
            
            console.log(detalle);
           try{

               if(detalle.length){
                  const detail= detalle[0];
                  console.log(detail)
                   res.status(200).send(detail);
               }else if(!detalle.length){
                const pokeName= await pokeDetail2(name);
                try{
                  res.status(200).send(pokeName);
                }catch(error){
                    console.log(error.message);
                    res.status(400).send({error: error.message});
                }
                
               }
               else{
                res.send("pokemon no encontrado");
               }
           }catch(error){
            res.status(400).send({error:"pokemon no encontrado"});
           }
        }
    }catch(error){
        res.status(400).send({error: error.message});
    }
    
});


module.exports = router;
