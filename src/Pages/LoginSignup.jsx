import React, { useEffect } from "react";
import "./CSS/LoginSignup.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    toast.success("✅ Signed up successfully!");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    toast.success("✅ Signed In successfully!");

    // ✅ Redirect to delivery/checkout after login
    setTimeout(() => {
      navigate('/Checkout');  // Change this path if your address page is different
    }, 1200);
  };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener('click', () => { });
      signInButton.removeEventListener('click', () => { });
    };
  }, []);

  return (
    <div className="container" id="container">
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social"><i className="fab fa-google"></i></a>
          </div>
          <span>Or use your email for registration</span>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social"><i className="fab fa-google"></i></a>
          </div>
          <span>Or use your account</span>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <ToastContainer />

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome!</h1>
            <p>Login with your personal info</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello!</h1>
            <p>Enter your personal details and start</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
