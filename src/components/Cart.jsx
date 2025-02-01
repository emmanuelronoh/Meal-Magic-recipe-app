
import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Paypal from "./paypal";
import axios from "axios";
import { setLogedInUser } from "../redux/slice/logedInUser";


const Cart = () => {
  const dispatch = useDispatch();


  let logedInUser = useSelector((state) => state.logedInUser.logedInUser);
  const PruchaseList = logedInUser?.purchased;
  
 
  const totalTax = PruchaseList.reduce((acc, item) => acc + (item.price * 10) / 100,0);
    const totalItemsPrice = PruchaseList.reduce((acc, item) => acc + item.price, 0);
    
   
    const[Total,setTotal]=useState((totalTax + totalItemsPrice).toFixed(2));



  const handleRemoveItem = async (element) => {
  
      let remaindRecipe = logedInUser.purchased.filter((item) => item.idMeal !== element.idMeal);
      const response = await axios.patch(`https://recipe-fake-api-r9ar.onrender.com/Users/${logedInUser.id}`, { purchased: [...remaindRecipe] });
  
      console.log('Success');
      const updatedUser = response.data;
  
    
       dispatch(setLogedInUser(updatedUser));

     // Update Total using callback 
     setTotal((prevTotal) => {
      const newTotal = (
        updatedUser.purchased.reduce((acc, item) => acc + item.price, 0) +
        updatedUser.purchased.reduce((acc, item) => acc + (item.price * 10) / 100, 0)
      ).toFixed(2);
      return newTotal;
    })


    
    console.log("Updated PruchaseList:", updatedUser.purchased);
    console.log("Updated Total:", Total);
    

    
  };
  

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <h2 className="text-center mb-4 fw-semibold display-5">Shopping Cart</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Recipe</th>
                <th scope="col">Tax</th>
                <th scope="col">Price</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {PruchaseList.map((r, index) => (
                <tr key={r.idMeal}>
                  <th scope="row" className="fw-medium">#{index + 1}</th>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        className="img-thumbnail"
                        src={r.strMealThumb}
                        alt="Meal Thumbnail"
                        style={{ width: "100px" }}
                      />
                      <p className=" fw-semibold ml-2 mb-0 ms-1 fst-italic">{r.strMeal}</p>
                    </div>
                  </td>
                  <td className="fw-bold">${((r.price * 5) / 100).toFixed(3)}</td>
                  <td className="fw-bold">${r.price}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => { handleRemoveItem(r) }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       
          <div className="text-center mt-4">
            <h3>Your Total Price</h3>
            <p className="display-5 fw-medium ">${(totalTax + totalItemsPrice).toFixed(3)}</p>
          
          </div>
         
          <div className="paypal-button-container text-center mt-4 mx-5"></div>
          <Paypal product={{price:Total}}></Paypal>
        </div>
      </div>
    </div>
  );
};

export default Cart;