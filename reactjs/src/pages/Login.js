import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/spotify";
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
          <button onClick={handleLogin}>Login with Spotify</button>
        </div>
      </main>
    </div>
  );
}

export default Login;
