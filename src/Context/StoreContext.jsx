import { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [ordersData, setOrdersData] = useState({});
    const [discount, setDiscount] = useState(0);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product.food_id === Number(item));
                totalAmount += itemInfo.food_price * cartItems[item];
            }
        }
        return totalAmount - discount;
    };

    const applyDiscount = (promoCode) => {
        if (promoCode === 'SOAMCA') {
            const discountAmount = getTotalCartAmount() * 0.20;
            setDiscount(discountAmount);
        } else {
            setDiscount(0);
        }
    };

    const placeOrder = (deliveryData) => {
        console.log(deliveryData);
        // Logic to place the order
    };

    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        applyDiscount,
        discount,
        isUserLoggedIn,
        setIsUserLoggedIn,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider