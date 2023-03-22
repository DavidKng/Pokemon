import { GET_DETAIL, GET_TYPES, GET_POKEMONS, GET_POKEMON_BY_NAME, POST_POKEMON, CLEAR_DETAIL, CLEAR_POKEMON_DETAIL } from "../actions";

const initialState= {
    pokemons: [],
    types: [],
    pokemonDetail: [],
    pokemonForm: [],
    detail: []
};

export function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_POKEMONS: 
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                detail: []
            }     
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case POST_POKEMON:
            return{
                ...state,
                pokemons: action.payload
            } 
        case CLEAR_POKEMON_DETAIL:
            return{
                ...state,
                pokemonDetail: []
            }
                           
        default: 
            return initialState
              
    };

};