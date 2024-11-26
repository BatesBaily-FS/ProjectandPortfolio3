import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const state = params.get("state");

    if (error) {
      console.error("Authentification error:", error);
      navigate("/login");
      return;
    }

    if (code) {
      fetch(`http://localhost:3000/auth/callback?code=${code}&state=${state}`)
        .then((response) => {
          if (response.ok) {
            navigate("/noresults");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Error during token exchange", err);
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
