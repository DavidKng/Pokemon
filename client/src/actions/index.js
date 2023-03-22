import axios from  "axios"; 
export const GET_POKEMONS= "GET_POKEMONS";
export const GET_TYPES= "GET_TYPES";
export const GET_DETAIL= "GET_DETAIL";
export const GET_POKEMON_BY_NAME= "GET_POKEMON_BY_NAME";
export const POST_POKEMON= "POST_POKEMON";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_POKEMON_DETAIL= "CLEAR_POKEMON_DETAIL";

export function getPokemons(page, order, filter, type, created){
    return async function(dispatch){
        try{
            let json= await axios.get("http://localhost:3001/pokemon?page=" + page + "&order=" + order + "&filter=" + filter + "&type=" + type + "&created=" + created);
            return dispatch({type: GET_POKEMONS, payload: json.data});
        }catch(error){
            console.log(error);
        }
    }
}
export function postPokemon( name, type, attack, defense, health, speed, height, weight ){
     return async function(dispatch){
        try{
            let json= await axios.post("http://localhost:3001/pokemon/create", {
                name: name,
                type: type,
                attack: attack,
                defense: defense,
                health: health,
                speed: speed,
                height: height,
                weight: weight
            });
            
            return json;
        }catch(error){
            console.log(error);
        }
     }
}

export function getPokemonByName(name){
    return async function(dispatch){
        try{
            let json= await axios.get("http://localhost:3001/pokemon?name=" + name);
            return dispatch({type: GET_POKEMON_BY_NAME, payload: json.data});
        }catch(error){
            console.log(error);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
          let json= await axios.get("http://localhost:3001/pokemon/" + id);
          return dispatch({type: GET_DETAIL, payload: json.data});
        }catch(error){
            console.log(error);
        }
    }
}
export function clearDetail(){
    return function(dispatch) {
        return dispatch({type: CLEAR_DETAIL});
    }
}
export function clearPokemonDetail(){
    return function(dispatch) {
        return dispatch({type: CLEAR_POKEMON_DETAIL});
    }
}
export function getTypes(){
    return async function(dispatch){
        try{
          let json= await axios.get("http://localhost:3001/type");
          return dispatch({type: GET_TYPES, payload: json.data});
        }catch(error){
            console.log(error)
        }
    }
}

export function setPokemonDetail(pokemonDetail){
    return{
        type: GET_DETAIL, payload: pokemonDetail.data
    }
}
