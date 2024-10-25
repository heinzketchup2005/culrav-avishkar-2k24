import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      const currentTime = Date.now() / 1000;

      if (decoded.exp > currentTime) {
        setIsAuthenticated(true);
      } else {
        // if not valid so remove the token
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
