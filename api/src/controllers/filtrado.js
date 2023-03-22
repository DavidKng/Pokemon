

  function filtrado(array, filter, page, type, order) {
    
    const arrayPoke=[];
    const pagina= Number(page);
    
    const limit= pagina +12;
    
    const tipo=filter;
    const arrayPoke2=[]

    function compare_name( a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
        }
        return 0;
    };

    function compare_name2( a, b) {
        if(a.name.toLowerCase() > b.name.toLowerCase()){
            return -1;
        }
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return 1;
        }
        return 0;
    }

    if(tipo){
        const pusheo= array.map((e) => {
            let poke={}
            if(e.types.includes(tipo)){
                poke=e;
                arrayPoke.push(e);
                
            }
        })
        console.log(arrayPoke);

    
        
            if(type === "attack"){
        
                if(order === "ASC"){
                   arrayPoke.sort((a, b ) => a.attack - b.attack )
                }else if(order === "DESC"){
                   arrayPoke.sort((a, b) => b.attack - a.attack )
                };
            }else if(type === "name"){
                if(order === "ASC"){
                   arrayPoke.sort(compare_name);
                }else if(order === "DESC"){
                   arrayPoke.sort(compare_name2);
                };
            }
        
            for(let i=pagina; i< limit ; i++){
                if(arrayPoke[i]){
                    
                    arrayPoke2.push(arrayPoke[i]);
                }
            }
            
            return arrayPoke2;
    
    
    } else{

        

        if(type === "attack"){
    
            if(order === "ASC"){
               array.sort((a, b ) => a.attack - b.attack )
            }else if(order === "DESC"){
               array.sort((a, b) => b.attack - a.attack )
            };
        }else if(type === "name"){
            if(order === "ASC"){
               array.sort(compare_name);
            }else if(order === "DESC"){
               array.sort(compare_name2);
            };
        }
        for(let i=pagina; i< limit ; i++){
            if(array[i]){
                
                arrayPoke.push(array[i]);
            }
        }
        
        return arrayPoke;
    }
}

module.exports.filtrado= filtrado;

