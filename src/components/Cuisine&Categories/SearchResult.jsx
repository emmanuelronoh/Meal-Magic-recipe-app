import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { getrecpie } from '../../redux/slice/Getdetails';
import { setLogedInUser } from "../../redux/slice/logedInUser";
import axios from "axios";

const SearchResult = ({ filteredData }) => {
  const [displayCount, setDisplayCount] = useState(21);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logedInUser = useSelector((state) => state.logedInUser.logedInUser);
  const [favRecipies, setFavRecipies] = useState([]);

  useEffect(() => {
    if (logedInUser) {
      setFavRecipies(logedInUser.favourite || []);
    }
  }, [logedInUser]);

  if (!filteredData) {
    return (
      <div className="text-center">
        <ClipLoader color="#198754" />
      </div>
    );
  }

  if (filteredData.length === 0) {
    return <h3>No data found</h3>;
  }

  const handleClick = (data, e) => {
    e.preventDefault();
        dispatch(getrecpie(data));
    navigate(`/Detailscusine/${data.idMeal}`);
  };

  const handleFavourite = (data,e) => {
    e.stopPropagation();
    if (!logedInUser) {
      alert("You need to login");
      return;
    }

    const foundRecipe = favRecipies.find((r) => r.idMeal === data.idMeal);
    if (foundRecipe) {
      const filteredFav = favRecipies.filter((r) => r.idMeal !== data.idMeal);
      handleUpdate({ ...logedInUser, favourite: filteredFav });
      setFavRecipies(filteredFav);
      alert("Recipe removed from favorites.");

    } else {

      const updatedFav = [...favRecipies, { ...data }];
      handleUpdate({ ...logedInUser, favourite: updatedFav });
      setFavRecipies(updatedFav);
      alert("Recipe added to favorites.");

    }
  };

  const handleUpdate = (updatedUser) => {
    console.log("logedInUser",logedInUser);
    axios.put(`https://recipe-fake-api-r9ar.onrender.com/Users/${logedInUser.id}`, updatedUser)
      .then((res) => {
        const updatedUser = res.data;
        dispatch(setLogedInUser(updatedUser));
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  const handleShowMore = () => {
    setDisplayCount(displayCount + 4);
  };

  return (
    <div className="row g-5">
      {filteredData.slice(0, displayCount)?.map((data) => {
        return (
          <div className="col-lg-4 col-md-6" key={data.idMeal}>
            <div
              className="overflow-hidden position-relative h-100"
              style={{ cursor: 'pointer' }}
              onClick={(e) => handleClick(data, e)}
            >
              <div className="border rounded h-100 overflow-hidden">
                <div className="w-100">
                  <img
                    className="w-100"
                    src={data.strMealThumb}
                    alt={data.strMeal}
                  />
                  <div
                    className="position-absolute bg-white rounded py-1 px-2"
                    style={{ top: '10px', right: '20px' }}
                    onClick={(e) => handleFavourite(data,e)}
                  >
                    <i
                      className={favRecipies.find((r) => r.idMeal === data.idMeal) ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
                      style={{ color: "#198754" }}
                    ></i>
                  </div>
                </div>

                <div className="p-3">
                  <h5 className="fw-700" onClick={handleClick} >{data.strMeal}</h5>
                  <p className="m-0 text-muted" onClick={handleClick} >{data.strArea}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
