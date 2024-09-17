import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Animals from "./Components/Animals/Animals";
import AnimalsDetails from "./Components/Animals/AnimalsDetails";
import Mating from "./Components/Mating/Mating";
import Weight from "./Components/Weight/Weight";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";



let routers = createBrowserRouter([
  {path:"", element:<Layout/>, children:[
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:"about" , element:<ProtectedRoute><About/></ProtectedRoute>},
    {path:"login" , element:<Login/>},
    {path:"register" , element:<Register/>},
    {path:"animals" , element:<ProtectedRoute><Animals/></ProtectedRoute>},
    {path:"AnimalsDetails" , element:<ProtectedRoute><AnimalsDetails/></ProtectedRoute>},
    {path:"mating" , element:<ProtectedRoute><Mating/></ProtectedRoute>},
    {path:"weight" , element:<ProtectedRoute><Weight/></ProtectedRoute>},

  ]}
])



export default function App() {

  let {setAuthorization} = useContext(UserContext);
  
  useEffect(()=>{
    if(localStorage.getItem('Authorization')!== null){
      setAuthorization(localStorage.getItem('Authorization'))
    }

  },[]);

  return <>

  <RouterProvider router={routers}>

  </RouterProvider>
  </>
}

