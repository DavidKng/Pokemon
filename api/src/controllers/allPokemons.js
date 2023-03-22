const axios = require ("axios");
const { Op } = require("sequelize");


  async function pokeDex (url)  {
    const poke = async () => {
        const arr = await axios.get(`${url}`);
        return arr.data.results;
    };
    const resApi= await poke();
    const pokemones= [];

    const pokeMap = await resApi.map((p) => {
        pokemones.push({
            name: p.name,
            url: p.url
        })
    })
    
    
    const mapPoke= async () => {
        const poke2= [];
        
       const koke=  pokemones.map( async (p)  => {
            const resp= await axios.get(`${p.url}`);
            return {
                    img: resp.data.sprites,
                    name: p.name,
                    height: resp.data.height,
                    id: resp.data.id,
                    weight: resp.data.weight,
                    types: resp.data.types,
                    stats: resp.data.stats
                }       
        })
      
       poke2.push(koke);

       return poke2; 
    } 
    const infoApi= await mapPoke();
    const ahoraSi= await Promise.all(...infoApi);
    
    return ahoraSi;
    
}; 
async function pokeDex2 (url) {
    const ejec= await pokeDex(url);
 

 try{
     
     const filt= await ejec.map((e) => {
        const tipo= e.types;
        const estado= e.stats;
        const imgs= e.img;
        const imgs2= imgs.other
        const imgs3= imgs2.home;
        const imgs4= imgs3.front_default;
        
        const tipo2= tipo.map(e => {
            return e.type
        });
        const estado2 = estado.map(e => {
            return  {
                stat: e.stat,
                puntaje: e.base_stat
            }
            
        });

        const tipo3 = tipo2.map((e) => {
            return e.name
        });

        const estado3 = estado2.map(e =>{
            return {
                stat: e.stat.name,
                puntaje: e.puntaje
            }
        })
        let hp="";
        let attack="";
        let defense="";
        let speed="";
        const estado4 = estado3.forEach(e => {
            if(e.stat === "hp"){
                 hp= e.puntaje;
                return hp;
            }else if(e.stat === "attack"){
                 attack= e.puntaje
                return attack;
            }else if(e.stat === "defense"){
                defense= e.puntaje;
                return defense;
            }else if(e.stat=== "speed"){
                speed= e.puntaje;
                return speed;
            }
        });
        
        return {
            ...e,
            health: hp,
            attack: attack,
            defense: defense, 
            speed: speed,
            types: tipo3,
            img: imgs4
        };
    })

    
    return filt;
    
     
 }catch(error){
    console.log(error);
 }

 
};




module.exports.pokeDex2= pokeDex2;
