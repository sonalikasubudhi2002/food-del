import React, { useState, useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, applyDiscount, discount } = useContext(StoreContext);
    const [promoCode, setPromoCode] = useState('');
    const navigate = useNavigate();

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const applyPromoCode = () => {
        applyDiscount(promoCode);
    };

    const subtotal = getTotalCartAmount();
    const tax = subtotal * 0.18;
    const deliveryFee = subtotal === 0 ? 0 : 5;
    const total = subtotal + tax - discount + deliveryFee;

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item.food_id] > 0) {
                        return (
                            <div key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={item.food_image} alt="" />
                                    <p>{item.food_name}</p>
                                    <p>₹{item.food_price}</p>
                                    <div>{cartItems[item.food_id]}</div>
                                    <p>₹{item.food_price * cartItems[item.food_id]}</p>
                                    <p className='cart-items-remove-icon' onClick={() => removeFromCart(item.food_id)}>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹{subtotal.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tax (18%)</p>
                            <p>₹{tax.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>-₹{discount.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>₹{deliveryFee.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹{total.toFixed(2)}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input
                                type="text"
                                placeholder='promo code'
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                            />
                            <button onClick={applyPromoCode}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart
