import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../actions/index";
import { useHistory } from 'react-router-dom';
import "./Form.css";
export function validate(name) {
  let errors = {};
  if(!name){
    errors.name = "Name is required"
  }else if (/[^a-zA-Z]/.test(name)){
    errors.name="Name is invalid"
  }

  

  return errors;
};

export default function  Form() {
  const dispatch= useDispatch(); 
  //const types= useSelector((state) => state.pokemonForm);
  const history= useHistory();
  //console.log(types);
  //const [typeObj, setTypeObj] = useState([]);
  const [type, setType] = useState([]);
  const [name, setName] = useState("");
  const [attack, setAttack] = useState(null);
  const [health, setHealth] = useState(null);
  const [defense, setDefense] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  
  useEffect(() => {
    dispatch(getTypes())
}, [dispatch]);

const allTypes= useSelector((state) => state.types);

 
  
  
 const handleNameChange=(e) => {
  setErrors(
    validate(e.target.value)
  );

  setName(e.target.value);

  }
  

  const handleTypeChange= (e) => {
    setType(e.target.value);
    
  }
  console.log(type);
  
  
  const handleAttackChange= (e) => {
    setAttack(e.target.value)
  };
  const handleDefenseChange= (e) => {
    setDefense(e.target.value)
  };
  const handleHealthChange= (e) => {
    setHealth(e.target.value)
  };
  const handleSpeedChange= (e) => {
    setSpeed(e.target.value)
  };
  const handleHeightChange= (e) => {
    setHeight(e.target.value)
  };
  const handleWeightChange= (e) => {
    setWeight(e.target.value)
  };
  
  console.log(type);
 
  const handleSubmit= (e) => {
    e.preventDefault();
    dispatch(postPokemon(name, type, attack, defense, health, speed, height, weight));
    console.log(name); 
    alert("el pokemon se a creado");
    history.push("/pokemon");
  };

  const[errors,setErrors] = useState({});

return (

     
     <form className="form" onSubmit={handleSubmit}>
        <h2>Pokémon Create</h2>
        
      <div>
        <input type="text" 
        name="name"
        value={name}
        placeholder="Name"
        onChange={handleNameChange}
        className={errors.name && "danger"}
        />
        {errors.name && <p className='danger'>{errors.name}</p>}
      </div>
        
      <div>
        <select
        name="tipo"
        value={type}
        placeholder="types"
        onChange={(e) => handleTypeChange(e)}>

            {allTypes?.map((e) =>       
             <option value={e.name} key={e.id}>{e.name} </option>
           )}

        </select>
      </div>
        
      <div>
        <input 
        type="number"
         name="attack"
         placeholder='Attack'
         value={attack}
         onChange={handleAttackChange}
         />      
      </div>
        
      <div>
        <input 
        type="number"
         name="health"
         placeholder='Health'
         value={health}
         onChange={handleHealthChange}
         />      
      </div>
        
      <div>
        <input 
        type="number"
         name="defense"
         placeholder='Defense'
         value={defense}
         onChange={handleDefenseChange}
         />      
      </div>
        
      <div>
        <input 
        type="number"
         name="speed"
         placeholder='Speed'
         value={speed}
         onChange={handleSpeedChange}
         />      
      </div>
        
      <div>
        <input 
        type="number"
         name="height"
         placeholder='Height'
         value={height}
         onChange={handleHeightChange}
         />      
      </div>
        
      <div>
        <input 
        type="number"
         name="weight"
         placeholder='Weight'
         value={weight}
         onChange={handleWeightChange}
         />      
      </div>
      <div>
        <button className="buttonForm" type="submit"  
        > Create </button>
      </div>
    </form>
    
   )
}

