import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearDetail } from "../../actions";


export default function Detail() {
    const dispatch= useDispatch();
    const history= useHistory();
    const detailPokemon= useSelector((state) => state.detail);

    const handleClick= (e) => {
        e.preventDefault();
        dispatch(clearDetail());
        history.push("/pokemon");
    }; 

   return <div className="principalDiv">
        
   <div  className="divPokeDetail">
      <div  className="face">
          <img  src={detailPokemon.img} alt={detailPokemon.name}/>  
          <h2>{detailPokemon.name}</h2>
         <h4 >Attack: {detailPokemon.attack}</h4>
         <h4 >Defense: {detailPokemon.defense} </h4>
         <h4 >Health: {detailPokemon.health}</h4>
         <h4 >Speed: {detailPokemon.speed}</h4>
         <h4 >weight: {detailPokemon.weight}</h4>
         <h4 >Height: {detailPokemon.height}</h4>
         <button  onClick={handleClick}>Close</button>
      </div>          
    </div>
</div>
};