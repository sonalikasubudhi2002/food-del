import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import GooglePay from './GooglePay';

const PlaceOrder = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showGooglePay, setShowGooglePay] = useState(false);
    const { getTotalCartAmount, discount, placeOrder } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            navigate('/');
        }
    }, [getTotalCartAmount, navigate]);

    const validateForm = () => {
        let newErrors = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
        requiredFields.forEach(field => {
            if (!data[field]) {
                newErrors[field] = 'This field is required';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (validateForm()) {
            placeOrder(data);
            setConfirmationMessage('Your order has been placed successfully!');
            setTimeout(() => navigate('/confirmation'), 2000);
        }
    };

    const handlePayOnline = () => {
        setShowGooglePay(true);
    };

    const subtotal = getTotalCartAmount();
    const tax = subtotal * 0.18;
    const deliveryFee = subtotal === 0 ? 0 : 5;
    const total = subtotal + tax - discount + deliveryFee;

    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='firstName'
                            onChange={onChangeHandler}
                            value={data.firstName}
                            placeholder='First name'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='lastName'
                            onChange={onChangeHandler}
                            value={data.lastName}
                            placeholder='Last name'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="email"
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder='Email address'
                        required
                    />
                    <span className='required-star'>*</span>
                    {errors.email && <div className='error-message'>{errors.email}</div>}
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        name='street'
                        onChange={onChangeHandler}
                        value={data.street}
                        placeholder='Street'
                        required
                    />
                    <span className='required-star'>*</span>
                    {errors.street && <div className='error-message'>{errors.street}</div>}
                </div>
                <div className="multi-field">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='city'
                            onChange={onChangeHandler}
                            value={data.city}
                            placeholder='City'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.city && <div className='error-message'>{errors.city}</div>}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='state'
                            onChange={onChangeHandler}
                            value={data.state}
                            placeholder='State'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.state && <div className='error-message'>{errors.state}</div>}
                    </div>
                </div>
                <div className="multi-field">
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='zipcode'
                            onChange={onChangeHandler}
                            value={data.zipcode}
                            placeholder='Zip code'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.zipcode && <div className='error-message'>{errors.zipcode}</div>}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            name='country'
                            onChange={onChangeHandler}
                            value={data.country}
                            placeholder='Country'
                            required
                        />
                        <span className='required-star'>*</span>
                        {errors.country && <div className='error-message'>{errors.country}</div>}
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        name='phone'
                        onChange={onChangeHandler}
                        value={data.phone}
                        placeholder='Phone'
                        required
                    />
                    <span className='required-star'>*</span>
                    {errors.phone && <div className='error-message'>{errors.phone}</div>}
                </div>
                {Object.keys(errors).length > 0 && <div className='error-message'>Delivery information is mandatory</div>}
                {confirmationMessage && <div className='confirmation-message'>{confirmationMessage}</div>}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>₹{subtotal.toFixed(2)}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Tax (18%)</p><p>₹{tax.toFixed(2)}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Discount</p><p>-₹{discount.toFixed(2)}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>₹{deliveryFee.toFixed(2)}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
                    </div>
                </div>
                <div className="payment-options">
                    <div className='payment-option'>
                        <input type="radio" name="payment" id="cod" />
                        <label htmlFor="cod">Cash On Delivery</label>
                    </div>
                    <div className='google-pay-option'>
                        {showGooglePay ? (
                            <GooglePay total={total.toFixed(2)} />
                        ) : (
                            <button onClick={handlePayOnline}>Pay Online</button>
                        )}
                    </div>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
