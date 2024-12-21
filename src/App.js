import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
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
import Resetpassword from "./Components/Login/Resetpassword.jsx";
import Forgetpassword from "./Components/Login/Forgetpassword.jsx";
import Verifyotp from "./Components/Login/Verifyotp.jsx";
import Breeding from "./Components/Breeding/Breeding.jsx";
import WeightTable from "./Components/Weight/WeightTable.jsx";
import WeightContextProvider from "./Context/WeightContext.js";
import EditWeight from "./Components/Weight/EditWeight.jsx";
import BreadingcontextProvider from "./Context/BreadingContext.js";
import BreadingTable from "./Components/Breeding/BreadingTable.jsx";
import EditBreeding from "./Components/Breeding/EditBreeding.jsx";
import GetAnimalContextProvider from "./Context/GetAnimalContext.js";
import Report from "./Components/Report/Report.jsx";
import ReportDaliy from "./Components/Report/ReportDaliy.jsx";
import Vaccinebyanimal from "./Components/Vaccine/Vaccinebyanimal.jsx";
import Vaccinebylocationshed from "./Components/Vaccine/Vaccinebylocationshed.jsx";
import VaccineanimalContextProvider from "./Context/VaccineanimalContext.js";
import VaccineTable from "./Components/Vaccine/VaccineTable.jsx";
import EditVaccine from "./Components/Vaccine/EditVaccine.jsx";
import HomeServices from "./Components/Home/HomeServices.jsx";
import ExclutedContextProvider from "./Context/ExclutedContext.js";
import Excluted from "./Components/Excluted/Excluted.jsx";
import Exclutedtable from "./Components/Excluted/ExclutedTable.jsx";
import EditExcluted from "./Components/Excluted/EditExcluted.jsx";



let routers = createBrowserRouter([
  {
    path: "", 
    element: <Layout />, 
    children: [
      { index: true, element: <ProtectedRoute><Home/></ProtectedRoute> },
      { path: "homeServices", element: <ProtectedRoute><HomeServices/></ProtectedRoute> },
      { path: "report", element: <ProtectedRoute><Report/></ProtectedRoute> },
      { path: "reportDaliy", element: <ProtectedRoute><ReportDaliy/></ProtectedRoute> },
      { path: "excluted", element: <ProtectedRoute><Excluted/></ProtectedRoute> },
      { path: "exclutedtable", element: <ProtectedRoute><Exclutedtable/></ProtectedRoute> },
      { path: "editExcluted/:id", element: <ProtectedRoute><EditExcluted/></ProtectedRoute> },

      { path: "login", element: <Login /> },
      { path: "verifyotp", element: <Verifyotp /> },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "resetpassword", element: <Resetpassword /> },
      { path: "register", element: <Register /> },
      { path: "breeding", element: <ProtectedRoute><Breeding /></ProtectedRoute> },
      { path: "breadingTable", element: <ProtectedRoute><BreadingTable /></ProtectedRoute> },
      { path: "editbreading/:id", element: <ProtectedRoute><EditBreeding /></ProtectedRoute> },
      { path: "animals", element: <ProtectedRoute><Animals /></ProtectedRoute> },
      // { path: "uploadExcel", element: <ProtectedRoute><UploadExcel /></ProtectedRoute> },
      { path: "editAnimal/:id", element: <ProtectedRoute><EditAnimal /></ProtectedRoute> },
      { path: "animalsDetails", element: <ProtectedRoute><AnimalsDetails /></ProtectedRoute> },
      { path: "mating", element: <ProtectedRoute><Mating /></ProtectedRoute> },
      { path:"editMating/:id", element: <ProtectedRoute><EditMating /></ProtectedRoute> },
      { path: "matingTable", element: <ProtectedRoute><MatingTable /></ProtectedRoute> },
      { path: "weight", element: <ProtectedRoute><Weight /></ProtectedRoute> },
      { path: "weightTable", element: <ProtectedRoute><WeightTable /></ProtectedRoute> },
      { path: "editWeight/:id", element: <ProtectedRoute><EditWeight /></ProtectedRoute> },
      { path: "vaccinebyanimal", element: <ProtectedRoute><Vaccinebyanimal/></ProtectedRoute> },
      { path: "vaccinebylocationshed", element: <ProtectedRoute><Vaccinebylocationshed/></ProtectedRoute> },
      { path: "vaccineTable", element: <ProtectedRoute><VaccineTable/></ProtectedRoute> },
      { path: "editVaccine/:id", element: <ProtectedRoute><EditVaccine/></ProtectedRoute> },
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
  <ExclutedContextProvider>
  <VaccineanimalContextProvider>
  <GetAnimalContextProvider>
  <BreadingcontextProvider>
  <WeightContextProvider>
  <MatingContextProvider>
<AnimalContextProvider>
  <RouterProvider router={routers}>

  </RouterProvider>
  </AnimalContextProvider>
  </MatingContextProvider>
  </WeightContextProvider>
  </BreadingcontextProvider>
  </GetAnimalContextProvider>
  </VaccineanimalContextProvider>
  </ExclutedContextProvider>
  </>
}

