import React from "react";
import axios from "axios";

import logo from "../components/spotifyLogo1.png";

function Login() {
  const handleLogin = () => {
    const clientId = "2fe5b6e2c26c464ab27f9240ddaece65";
    const redirectUri = window.location.origin + "/auth/callback";
    const scopes = ["user-read-private", "user-read-email"];
    const state = generateRandomString(16);

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(" "))}&state=${state}`;
    window.location.href = authUrl;
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
