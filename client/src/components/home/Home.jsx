import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../actions/index";
import PokemonCard from "../pokemonCard/PokemonCard";
import SearchBar from "../searchBar/SearchBar";
import "./Home.css";

export default function Home(){
    const dispatch = useDispatch();

    const [pages, setPages] = useState(0);
    const [order, setOrder] = useState("");
    const [type, setType] = useState("");
    const [filter, setFilter] = useState("");
    const [created, setCreated]= useState("");
    useEffect(() => {
        dispatch(getPokemons(pages, order, filter, type, created))
    }, [dispatch, pages, order, filter, type, created]);
    
    const allPokemons= useSelector((state) => state.pokemons);
    
    useEffect(() =>{
        dispatch(getTypes())
    }, [dispatch])

   const allTypes= useSelector((state) => (state.types));

    const prev = (e) => {
        e.preventDefault();
        if(pages <= 0){
            setPages(0);
        }else{
            setPages(pages - 12);
        }
    };

    const next = (e) => {
        e.preventDefault();
        if(allPokemons.length < 12){
            return;
        }else{
            setPages(pages + 12);
        }
    };

    const changeOrder = (e) => {
        e.preventDefault();
        setOrder(e.target.value);
    };

    const changeFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    };

    const changeType= (e) => {
        e.preventDefault();
        setType(e.target.value);
    };
    const changeCreated = (e) => {
        e.preventDefault();
        setCreated(e.target.value)
    }

    return(

        <div>
            
             
          <div className="headerDiv"> 

            <div className="filters">
            <select className="filtro" onChange={(e) => changeOrder(e)}>
                <option className="filterOption" value="">Order</option>
                <option className="filterOption" value="ASC">ASC</option>
                <option className="filterOption" value="DESC">DESC</option>
            </select>
            <select className="filtro" onChange={(e) =>changeFilter(e)}>
                <option className="filterOption" value=""> Types </option>
                {allTypes.map((e) =>
                
                  <option className="filterOption" key={e.id} value={e.name}>{e.name}</option>
                )}     
            </select>
            <select className="filtro" onChange={(e) => changeType(e)}>
                <option className="filterOption" value="">Filter</option>
                <option className="filterOption" value="name">Name</option>
                <option className="filterOption" value="attack">Attack</option>
            </select>
            <select className="filtro" onChange={(e) => changeCreated(e)}>
                <option className="filterOption" value="">Pokémons</option>
                <option className="filterOption" value="creado">Created</option>
                <option className="filterOption" value="noCreado">No Created</option>
            </select>
          </div>
            
            <SearchBar/>
            

             <NavLink className="navlink" to="/create">Crear nuevo Pokémon</NavLink>
         
         </div> 
     <div className="sectionCards">      
             

              {allPokemons?.map((pokemon) => ( 
                  <div className="divCard" key={pokemon.id}>
                 <PokemonCard  name={pokemon.name} img={pokemon.img} types={pokemon.types}  attack={pokemon.attack} id={pokemon.id} />       
                  </div>
                 ))|| <span>Pokémon no encontrada</span>}
              
              
        
        </div>    
        <footer className="foot">
            <button className="buttonFootleft" onClick={prev}>prev</button>
            <button className="buttonFootright"  onClick={next}>next</button>
        </footer>
        </div>
    );
};