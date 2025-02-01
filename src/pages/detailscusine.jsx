
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";


const Detailscusine = () => {
    const state = useSelector((st) => st.getrecpie.getrecpie);
    const [recipe, setRecipe] = useState([]);
    console.log(state);
  
    const [showFullText, setShowFullText] = useState(false);
    const toggleFullText = () => {
      setShowFullText(!showFullText);
    };
  
    const [isChecked, setIsChecked] = useState({});
  
    const handleCheckboxChange = (key) => (event) => {
      setIsChecked((prev) => ({
        ...prev,
        [key]: event.target.checked,
      }));
    };
  
    useEffect(() => {
      
          axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state.idMeal}`)
          .then((response) => {
            console.log("response.data.meals",response.data.meals);
            setRecipe(response.data.meals)
          })
          .catch((err) => {
            console.log(err)
          }) 
        
    }, [state]);
    return (
        <div>
           <div>
      <Navbar />
      {recipe && recipe.map((u, index) => (
        <div key={index} className="container mt-5 " style={{overflowX:"hidden"}}>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <h2 className="mb-3 text-success fs-1 fw-bold">{u.strMeal}</h2>
              <hr></hr>
              <img src={u.strMealThumb} alt="recipe" className="img-fluid mb-3" />
              <div className="bg-light rounded p-4">
                <h3 className="mb-3 text-success fs-2 fw-bold">Instructions:</h3>
                <p className="fs-3">
                  {showFullText ? u.strInstructions : `${u.strInstructions.substring(0, 200)}...`}
                  <button className="btn btn-success ms-2" onClick={toggleFullText}>
                    {showFullText ? "See Less" : "See More"}
                  </button>
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="bg-light rounded p-4">
                <h3 className="mb-3 text-success fs-2 fw-bold">Ingredients:</h3>
                <ul className="list-unstyled">
                  {Object.keys(u).map((key, i) => {
                    if (key.includes("strIngredient") && u[key]) {
                      const measureKey = key.replace("strIngredient", "strMeasure");
                      const measure = u[measureKey];
                      return (
                        <li key={i} className="fs-4">
                          <input
                            type="checkbox"
                            id={key}
                            name={key}
                            value={u[key]}
                            checked={isChecked[key]}
                            onChange={handleCheckboxChange(key)}
                          />
                          <label htmlFor={key} className="ps-1" style={{ position: "relative" }}>
                            {measure} {u[key]}
                            <span style={{ position: "absolute", bottom: "0", left: "0", width: "100%", height: isChecked[key] ? "2px" : "0", backgroundColor: isChecked[key] ? "green" : "black" }}></span>
                          </label>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
              <div className="mt-3">
                <YouTube videoId={u.strYoutube?.split("=")[1]} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>  
        </div>
    );
}

export default Detailscusine;

