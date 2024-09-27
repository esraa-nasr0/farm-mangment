import axios from "axios";
import { createContext } from "react";


export let MatingContext = createContext();


let Authorization = localStorage.getItem('Authorization')

let headers = {
    Authorization: `Bearer ${Authorization}`
    }

    function getMating() {
        return axios.get(`https://farm-project-bbzj.onrender.com/api/mating/getallmating` , {headers})
        .then((response)=>response)
        .catch((err)=>err)
    }

    function deleteMating(id) {
        return axios.delete(`https://farm-project-bbzj.onrender.com/api/mating/deletemating/${id}` , {headers})
        .then((response)=>response)
        .catch((err)=>err)
    }


    export default function MatingContextProvider(props) {
        return <MatingContext.Provider value={{getMating , deleteMating}}>
            {props.children}
        </MatingContext.Provider>
    }
