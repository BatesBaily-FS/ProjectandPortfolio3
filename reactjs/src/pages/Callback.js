import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  useEffect(() => {
    fetch("http://localhost:8888/auth/user", {
      method: "GET",
      credentials: "includes",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return <div>Loading user data...</div>;
};
export default Callback;
