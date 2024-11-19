import React from "react";

import logo from "../components/spotifyLogo1.png";

function Login() {
  const handleLogin = () => {
    window.location.href =
      "https://projectportfolio3-d62d160438fd.herokuapp.com/auth/login";
  };

  return (
    <div>
      <main className="login-page">
        <div className="logo-container">
          <img src={logo} className="page-logo" />
        </div>
        <h1 className="login-heading">Login</h1>
        <h3 className="login-message">
          Please login to search artists, albums or songs on your Spotify
          account{" "}
        </h3>
        <div className="signinButton">
          <button onClick={handleLogin} className="button">
            Login with Spotify
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;