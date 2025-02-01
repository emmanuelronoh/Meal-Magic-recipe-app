import React from "react";
import Fav from "../components/fav";
import { useSelector } from "react-redux";

const FavPage = () => {
  let logedInUser = useSelector((state) => state.logedInUser.logedInUser);

  return (
    <div>
      {logedInUser&&
      <Fav></Fav>}
      {!logedInUser&&
    alert("you have to login first")  
      }
    </div>
  );
};

export default FavPage;
