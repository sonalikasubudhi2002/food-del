import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { login, signup } from '../../firebase';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // Checkbox state
  const { setIsUserLoggedIn } = useContext(StoreContext);

  const user_auth = async (event) => {
    event.preventDefault();
    if (!termsAccepted) {
      alert('You must accept the terms of use and privacy policy.');
      return;
    }
    if (currState === 'Sign Up') {
      await signup(name, email, password);
      setCurrState('Login'); // Switch to login after sign up
    } else {
      await login(email, password);
      setIsUserLoggedIn(true);
      setShowLogin(false); // Close the login popup
    }
  };

  return (
    <div className='login-popup'>
      <div className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              placeholder='Your name'
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Your email'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
        </div>
        <button onClick={user_auth} type='submit'>
          {currState === 'Login' ? 'Login' : 'Create account'}
        </button>
        <div className='login-popup-condition'>
          <input
            type='checkbox'
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup