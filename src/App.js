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
import AnimalContextProvider from "./Context/AnimalContext";
import EditAnimal from "./Components/Animals/EditAnimal";
import MatingTable from "./Components/Mating/MatingTable.jsx";
import MatingContextProvider from "./Context/MatingContext";
import EditMating from "./Components/Mating/EditMating.jsx";
import ViewAnimalDetails from "./Components/Animals/ViewAnimalDetails.jsx";
import Resetpassword from "./Components/Login/Resetpassword.jsx";
import Forgetpassword from "./Components/Login/Forgetpassword.jsx";
import Verifyotp from "./Components/Login/Verifyotp.jsx";


let routers = createBrowserRouter([
  {
    path: "", 
    element: <Layout />, 
    children: [
      { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
      { path: "about", element: <ProtectedRoute><About/></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "verifyotp", element: <Verifyotp /> },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "resetpassword", element: <Resetpassword /> },
      { path: "register", element: <Register /> },
      { path: "animals", element: <ProtectedRoute><Animals /></ProtectedRoute> },
      { path: "viewAnimalDetails/:id", element: <ProtectedRoute><ViewAnimalDetails /></ProtectedRoute> },
      { path: "editAnimal/:id", element: <ProtectedRoute><EditAnimal /></ProtectedRoute> },
      { path: "animalsDetails", element: <ProtectedRoute><AnimalsDetails /></ProtectedRoute> },
      { path: "mating", element: <ProtectedRoute><Mating /></ProtectedRoute> },
      { path:"editMating/:id", element: <ProtectedRoute><EditMating /></ProtectedRoute> },
      { path: "matingTable", element: <ProtectedRoute><MatingTable /></ProtectedRoute> },
      { path: "weight", element: <ProtectedRoute><Weight /></ProtectedRoute> },
    ],
  },
]);





export default function App() {

  let {setAuthorization} = useContext(UserContext);
  
  useEffect(()=>{
    if(localStorage.getItem('Authorization')!== null){
      setAuthorization(localStorage.getItem('Authorization'))
    }

  },[]);

  return <>
  <MatingContextProvider>
<AnimalContextProvider>
  <RouterProvider router={routers}>

  </RouterProvider>
  </AnimalContextProvider>
  </MatingContextProvider>
  </>
}

