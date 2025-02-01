/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import style from "../Styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLogedInUser } from "../redux/slice/logedInUser";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../redux/slice/Language';
import i18n from '../i18n.js';

export default function Navbar() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language);
  // const { t } = useTranslation();
  // const t = useTranslation();
  // const {t, i18n} = useTranslation();
  // let logedInUser = useSelector((state) => state.logedInUser.logedInUser);
  const [t, i18n] = useTranslation();
  console.log(i18n)
  console.log(t);

  
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    dispatch(changeLanguage(language));
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    console.log('Current Language:', currentLanguage);
    // console.log(t)
  }, [currentLanguage]);

  let logedInUser = useSelector((state) => state.logedInUser.logedInUser);
  const [isAdmin, setisAdmin] = useState(false);
  let initials = "Guest";
  
  useEffect(() => {
    if (logedInUser) {
      setisAdmin(logedInUser.isAdmin);
    }
  }, []);

  console.log("Home component rendered");
  if (logedInUser) {
    console.log(logedInUser);
  } else {
    console.log("Guest");
  }
  const HandleClick = () => {
    dispatch(setLogedInUser(null));
    setisAdmin(false);
  };

  if (logedInUser) {
    initials =
      `${logedInUser.firstName[0]}${logedInUser.lastName[0]}`.toUpperCase();
  }

  return (
    <div id="navBar" dir={`${i18n.language}`==='en'?"ltr":"rtl"}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <div className="d-flex gap-2 align-items-center">
              <img
                src={"../images/chef.svg"}
                alt="logo"
                style={{ color: "#1c1c1c", width: "70px" }}
                className={style.chefLogo}
              />
              <span className={style.mealMagic}>
                <span> Meal</span>{" "}
                <span style={{ color: "#198754" }}>Magic</span>
              </span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ border: "none" }}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse  " id="navbarNav">
            <ul className={`${style.navList} navbar-nav m-auto fs-6`} style={{ fontSize: "1.5rem" }}>
              <li className="nav-item px-1">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/home"
                >
                  {t('Home')}
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/cuisine">
                  {t('Recipes')}
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/category">
                {t('Categories')}
                  
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/blog">
                  {t('Blog')}
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/contact">
                  {t('Contact Us')}
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/premium">
                {t('Premium Recipe')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center ms-auto">
            <div
              className="User d-flex align-items-center justify-content-center"
              style={{
                width: "3rem",
                height: "3rem",
                border: "3px solid #198754",
                borderRadius: "50%",
                color: "black",
                marginRight: "10px",
              }}
            >
              <p style={{ margin: "0", color: "black", fontSize: "0.9rem", fontWeight: "600" }}>{initials}</p>
            </div>

            <div>
              <select
                className="btn btn-light me-3"
                onChange={handleLanguageChange}
              >
                <option value="en">En</option>
                <option value="ar">Ar</option>
              </select>
            </div>

            <div className="signUp d-none d-lg-block d-xl-block d-xxl-block">
              {!logedInUser && (
                <button className="btn btn-light shadow-sm me-3 px-4">
                  <Link className="nav-link" to="/login">
                  {t('Log in')}
                  </Link>
                </button>
              )}
              {logedInUser && (
                <button
                  onClick={HandleClick}
                  className="btn btn-light shadow-sm me-3 px-4"
                >
                  <Link className="nav-link" to="/Home">
                  {t('Log out')}
                  </Link>
                </button>
              )}
             
              {!logedInUser&&(
              <button className="btn btn-success shadow-sm px-4">
                <Link className="nav-link" to="/signin">
                {t('Sign up')}
                </Link>
              </button>)}
            </div>
          </div>
{logedInUser&&(
          <Link to='/cart' style={{ color: 'black', position: 'relative' }}>
            <div>
            <i
              className="bi bi-cart3 p-2 mx-2  "
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                borderRadius: '10px',
                width: '60px',
                height: '60px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            ></i>
            <div
              className="rounded-circle bg-success d-flex justify-content-center align-items-center"
              style={{
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(25%, 25%)',
              }}
            >
              {/* {counter}  */}
              {logedInUser?.purchased.length||0}
            </div>
            </div>
          </Link>)}
          {logedInUser&&(
          <Link to={"/fav"} style={{ color: "black", position: "relative" }}>
            <i
              className="bi bi-bookmark-fill p-2 mx-2  "
              style={{
                color: "#198754",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "10px",
                width: "60px",
                height: "60px",
                textAlign: "center",
                cursor: "pointer",
              }}
            ></i>
            <div
              className="rounded-circle bg-success d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {logedInUser?.favourite?.length || 0}
            </div>
          </Link>)}
        </div>
      </nav>
    </div>
  );
}
