import React from 'react';
import {toast} from "react-toastify";


function changeFavorite(product : any){
    if(!localStorage.getItem('favorite')){
        localStorage.setItem('favorite' , JSON.stringify([]))
    }
    let favorite = JSON.parse(String(localStorage.getItem('favorite')));    
    for(let index in favorite){
        if(favorite[index].id == product.id){
            favorite.splice(index , 1)
            localStorage.setItem('favorite' , JSON.stringify(favorite))
            return favorite
        }
    }
    favorite.push({
        'title':product.title ,
        'image':product.children[0].top,
        'id':product.id,
        'uri':product.uri
    })
    localStorage.setItem('favorite' , JSON.stringify(favorite))
    return favorite ;
}

export {changeFavorite};







