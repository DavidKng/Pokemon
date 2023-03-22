

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearPokemonDetail} from "../../actions";
import "./PokemonDetail.css"

export default function PokemonDetail () {
    const dispatch= useDispatch();
    const history= useHistory();
    const detallePokemon= useSelector((state) => state.pokemonDetail);
    
       
     const handleClick= (e) => {
        e.preventDefault();
        dispatch(clearPokemonDetail());
        history.push("/pokemon");      
    };
    return <div className="principalDiv">
        
       <div  className="divPokeDetail">
          <div  className="face">
              <img  src={detallePokemon.img} alt={detallePokemon.name}/>  
              <h2>{detallePokemon.name}</h2>
             <h4 >Attack: {detallePokemon.attack}</h4>
             <h4 >Defense: {detallePokemon.defense} </h4>
             <h4 >Health: {detallePokemon.health}</h4>
             <h4 >Speed: {detallePokemon.speed}</h4>
             <h4 >weight: {detallePokemon.weight}</h4>
             <h4 >Height: {detallePokemon.height}</h4>
             <button  onClick={handleClick}>Close</button>
          </div>          
        </div>
    </div>
    
    
};