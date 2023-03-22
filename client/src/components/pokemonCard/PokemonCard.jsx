import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getDetail } from "../../actions/index";
import {pokemonColor} from "../../controllers/index"
import "./PokemonCard.css"



export default function PokemonCard(pokemon) {

    const dispatch= useDispatch();
    const tipos= pokemon.types;
    const color= pokemonColor(tipos);
    console.log(pokemon.id);
    const id= pokemon.id;
    
    const handleClick= () => {
        dispatch(getDetail(id))
    }
    
    return   <div className="container" style= {{backgroundColor: `${color}`}} key={pokemon.key} >
               <img className="img" src= {`${pokemon.img}`} alt={`${pokemon.name}`}/>
               <section className="section">
                 <h2>
                  {pokemon.name}
                </h2>
               <ul className="ulCard">
                {tipos.map((p) => 
                
                <li key={p.id}>{p}</li>
                )}
                
               </ul>
               <button className="cardButton" onClick={handleClick}><NavLink className="navLinkCard" to={`/pokemon/${pokemon.id}`} >Detalle
                </NavLink></button>
               </section>

        </div>
    
};