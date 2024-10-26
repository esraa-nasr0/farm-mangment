import axios from "axios";
import { createContext } from "react";



export let GetAnimalContext = createContext();


let Authorization = localStorage.getItem('Authorization')

let headers = {
    Authorization: `Bearer ${Authorization}`
    }

    function getAnimalMating(animalid) {
        return axios.get(`https://farm-project-bbzj.onrender.com/api/mating/GetSingleAnimalMating/${animalid}` , {headers})
        .then((response)=>response)
        .catch((err)=>err)
    }

    function getAnimalWeight(animalid) {
        return axios.get(`https://farm-project-bbzj.onrender.com/api/weight/GetSingleAnimalWeight/${animalid}` , {headers})
        .then((response)=>response)
        .catch((err)=>err)
    }


export default function GetAnimalContextProvider(props) {
    return <GetAnimalContext.Provider value={{getAnimalMating , getAnimalWeight}}>
            {props.children}      
        </GetAnimalContext.Provider>
    
}