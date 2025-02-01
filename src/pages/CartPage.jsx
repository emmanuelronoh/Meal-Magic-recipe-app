import React from 'react';
import Cart from '../components/Cart';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const logedInUser = useSelector((state) => state.logedInUser.logedInUser);

    // Move the logic for rendering alert and navigation inside the component
    if (!logedInUser) {
        alert("You have to login first");

        // Returning null here to prevent rendering the Cart component
        return null;
    }

    return (
        <div>
            <Cart />
        </div>
    );
}

export default CartPage;
