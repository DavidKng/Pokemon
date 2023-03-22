import './App.css';
import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import PokemonDetail from "./components/pokemonDetail/PokemonDetail";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/pokemon" component={Home} />
      <Route path="/create" component={Form} />
      <Route path="/pokemon/:id" component={Detail} />
      <Route path="/detail/:name" component={PokemonDetail}/>
    </div>  
    </BrowserRouter>
  );
}

export default App;
