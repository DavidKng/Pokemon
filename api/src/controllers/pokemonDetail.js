const axios = require ("axios");



async function pokeDetail (id){
    const poke = async () => {
        const arr = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return {
            
                img: arr.data.sprites,
                name: arr.data.name,
                height: arr.data.height,
                id: arr.data.id,
                weight: arr.data.weight,
                types: arr.data.types,
                stats: arr.data.stats
             
        };
    };
    const resApi= await poke();
    return resApi;
};


async function pokeDetail2 (id){

    const ejec= await pokeDetail(id)
         
           const tipo= ejec.types;
           const estado= ejec.stats;
           const imgs= ejec.img;
        const imgs2= imgs.other
        const imgs3= imgs2.home;
        const imgs4= imgs3.front_default;

           

           const tipo2= tipo.map(pokemon => {
               return pokemon.type
           });
           const estado2 = estado.map(pokemon => {
               return  {
                   stat: pokemon.stat,
                   puntaje: pokemon.base_stat
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
           
          
       const resultado= {
            name: ejec.name,
            height: ejec.height,
            id: ejec.id,
            weight: ejec.weight,
            health: hp,
            attack: attack,
            defense: defense, 
            speed: speed,
            types: tipo3,
            img: imgs4
       }
   
       return resultado;
   
} 

module.exports.pokeDetail2= pokeDetail2;