import React from "react";

function Login() {
  const clientId = "2fe5b6e2c26c464ab27f9240ddaece65";
  const redirectUri = "http://localhost:3000/callback";

  const scopes = ["user-read-private", "user-read-email"];

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/auth/login";
  };

  return (
    <div>
      <main>
        <h1>Login</h1>
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
