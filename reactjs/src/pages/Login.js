import React from "react";

import logo from "../components/spotifyLogo1.png";

function generateRandomString(length) {
  const characters =
    "abcdefghijklmnopqurstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

function Login() {
  const handleLogin = () => {
    const clientId = "fe224714523d4264b26567ebb8ffab26";
    const redirectUri = window.location.origin + "/auth/callback";
    const scopes = ["user-read-private", "user-read-email"];
    const state = generateRandomString(16);

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&state=${state}&show_dialog=true`;
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
