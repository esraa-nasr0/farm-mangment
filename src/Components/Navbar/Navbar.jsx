import React, { useContext }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";


export default function Navbar() {
  
  let {Authorization, setAuthorization} = useContext(UserContext);
  let nanigate = useNavigate();

  function LogOut() {
    localStorage.removeItem('Authorization');
    setAuthorization(null);
    nanigate('/home')
  }

  return <>
      <nav className="  navbar p-3 mb-2 fixed-top navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Authorization !==null? <>

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="animals">
              Animals
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="mating">
              Mating
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="weight">
              Weight
            </Link>
          </li>
            </>:""}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {Authorization !==null? <>
            <li className="nav-item">
            <Link onClick={()=> LogOut()} className="nav-link active" >LogOut</Link>
            </li>
            </>:<>
          <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="Register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="Login">
                Login
              </Link>
            </li>
            </>}
          </ul>
        </div>
        </div>
      </nav>

    </>
  
}
