import axios from "axios";
import { createContext } from "react";

export let Breadingcontext = createContext();

let Authorization = localStorage.getItem('Authorization');

let headers = {
    Authorization: `Bearer ${Authorization}`,
};

function getallbreading() {
    return axios.get(`https://farm-project-bbzj.onrender.com/api/breeding/GetAllBreeding`, { headers })
        .then((response) => response)
        .catch((err) => err);
}
export function Deletbreading(id) {
    return axios.delete(`https://farm-project-bbzj.onrender.com/api/breeding/DeleteBreeding/${id}`, { headers })
        .then((response) => response)
        .catch((err) => {
            console.error("Error deleting breeding:", err.response || err);
            return err;
        });
}



export default function BreadingcontextProvider(props) {
    return (
        <Breadingcontext.Provider value={{ getallbreading ,Deletbreading }}>
            {props.children}
        </Breadingcontext.Provider>
    );
}