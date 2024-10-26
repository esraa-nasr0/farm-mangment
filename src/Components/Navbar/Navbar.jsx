import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  let { Authorization, setAuthorization } = useContext(UserContext);
  let navigate = useNavigate();
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  function LogOut() {
    localStorage.removeItem("Authorization");
    setAuthorization(null);
    navigate("/home");
  }

  // دالة لتبديل اللغة
  function toggleLanguage() {
    const newLanguage = language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  }


  return (
    <>
      <nav
  className="navbar p-3 mb-2 fixed-top navbar-dark navbar-expand-lg"
  style={{ backgroundColor: "#2f5e97" }}
>
  <div className="container-fluid">
    <Link className="navbar-brand" to="#" style={{ color: "#E9E6E2" }}>
      Navbar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {Authorization !== null ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#E9E6E2" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="breadingTable"
                style={{ color: "#E9E6E2" }}
              >
                Breeding
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="animals"
                style={{ color: "#E9E6E2" }}
              >
                Animals
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="report"
                style={{ color: "#E9E6E2" }}
              >
                Report
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="reportDaliy"
                style={{ color: "#E9E6E2" }}
              >
                ReportDaliy
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="matingTable"
                style={{ color: "#E9E6E2" }}
              >
                Mating
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="weightTable"
                style={{ color: "#E9E6E2" }}
              >
                Weight
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="VaccineTable"
                style={{ color: "#E9E6E2" }}
              >
                Vaccine
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="vaccinebylocationshed"
                style={{ color: "#E9E6E2" }}
              >
                Vaccinebylocationshed
              </Link>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* زر تبديل اللغة */}
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={toggleLanguage} style={{ color: "#E9E6E2" }}>
                  {language === "en" ? "العربية" : "English"}
                </button>
              </li>
        {Authorization !== null ? (
          <li className="nav-item">
            <Link
              onClick={() => LogOut()}
              className="nav-link active"
              style={{ color: "#E9E6E2" }}
            >
              LogOut
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="Register"
                style={{ color: "#E9E6E2" }}
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="Login"
                style={{ color: "#E9E6E2" }}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

    </>
  );
}
