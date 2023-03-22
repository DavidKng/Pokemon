import React from  "react";
import { useDispatch} from "react-redux";
import { NavLink } from "react-router-dom";
import { getTypes } from "../../actions/index";
import "./Landing.css";

export default function Landing(props){
    
    const dispatch = useDispatch();
     
    const handleClick= (e) => {
        e.preventDefault();
        dispatch(getTypes());
    };

    return  <div >
        
           
           
           <button className="button" onClick={handleClick}><NavLink className="navLinkLanding" to="/pokemon"> Start</NavLink></button>
           
        
        </div>
    
        
    
};