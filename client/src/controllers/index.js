

export const pokemonColor= function (tipos) {
    if(tipos.includes("fire")){
        return "orange"
    }
    if(tipos.includes("water")){
        return "lightblue"
    }if(tipos.includes("grass")){
        return "lightgreen"
    }if(tipos.includes("poison")){
        return "purple"
    }if(tipos.includes("normal")){
        return "grey"
    }if(tipos.includes("electric")){
        return "yellow"
    }if(tipos.includes("bug")){
        return "darkgreen"
    }if(tipos.includes("ground")){
        return "brown"
    }if(tipos.includes("fairy")){
        return "pink"
    }if(tipos.includes("dragon")){
        return "lightyellow"
    }else return "lightgrey"   
}