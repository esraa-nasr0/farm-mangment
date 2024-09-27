import axios from "axios";
import { createContext } from "react";

export let AnimalContext = createContext();


let Authorization = localStorage.getItem('Authorization')

let headers = {
    Authorization: `Bearer ${Authorization}`
    }

    function getAnimals() {
        return axios.get(`https://farm-project-bbzj.onrender.com/api/animal/getallanimals` , {headers} )
        .then((response)=>response)
        .catch((err)=>err)
    }



    function removeAnimals(id) {
        return axios.delete(`https://farm-project-bbzj.onrender.com/api/animal/deleteanimal/${id}` , {headers})
        .then((response)=>response)
        .catch((error)=>error)
    }


export default function AnimalContextProvider(props) {

    return <AnimalContext.Provider value={{removeAnimals , getAnimals }}>
        {props.children}
    </AnimalContext.Provider>
}