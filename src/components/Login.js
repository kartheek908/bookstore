import React from 'react';
import { auth, provider } from './FireBase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Login({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/books';

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoggedIn(true);
        navigate(redirectTo, { state: location.state });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login-container">
      {!loggedIn && (
        <button className="login-button" onClick={googleLogin}>Continue with Google</button>
      )}
    </div>
  );
}

export default Login;
