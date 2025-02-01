/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../components/Cuisine&Categories/Search';
import CountryList from '../components/Cuisine&Categories/countryList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const [currCountry, setCurrCountry] = useState(null);
  const countriesArr = ['Egyptian', 'American', 'Italian', 'Thai', 'Japanese'];

  const { country } = useParams();

  async function getCountryData(country) {
    const check = localStorage.getItem(country);
    if (check) {
      setCuisine((pre) => [...pre, ...JSON.parse(check)]);
    } else {
      const {
        data: { meals },
      } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
      );
      setCuisine((pre) => [...pre, ...meals]);
      localStorage.setItem(country, JSON.stringify(meals));
    }
  }

  function getAllCuisine() {
    setCurrCountry(null);
    setCuisine([]);
    if (country) {
      return getCountryData(country);
    } else {
      countriesArr.map((country) => {
        return getCountryData(country);
      });
    }
  }

  useEffect(() => {
    setCurrCountry(country);
    getAllCuisine();
  }, [country, currCountry]);

  const backgroundImageUrl = currCountry
    ? `/images/${currCountry}.jpg`
    : '/images/9.jpg';

  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid cuisine" style={{ padding: '2rem' }}>
        <div className="row">
          <div className="col-12">
            <div
              style={{
                background: `url(${backgroundImageUrl}) no-repeat`,
                backgroundPosition: 'center',
              }}
              className="banner rounded-4 overflow-hidden d-flex align-items-center justify-content-center"
            >
              <h1>{currCountry || 'Recipes'}</h1>
            </div>
          </div>
        </div>

        <div id="search" className="row my-5">
          <div className="col-md-2">
            <CountryList />
          </div>
          <div className="col-md-10 ps-4">
            <Search allData={cuisine} />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cuisine;
