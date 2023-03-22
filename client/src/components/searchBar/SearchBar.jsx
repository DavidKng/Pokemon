import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getPokemonByName } from "../../actions/index";
import { NavLink } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const handleInputChange= (e) => {
        e.preventDefault();
        setName(e.target.value);
    };
    
    const handleClick= (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(name));
    };

    return (
        
        <div className="divSearch">
         <input
         type="text"
         placeholder=" Search Pokémon..."
         onChange={handleInputChange}
         />
         <button className="buttonSearch" onClick={handleClick} >
         <NavLink className="navLinkSearch" to={`/detail/${name}`}>Search</NavLink>
         </button>
         
        </div>
    );
};