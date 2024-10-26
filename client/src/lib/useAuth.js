import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp > currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Invalid token", err);
    return false;
  }
};

export default useAuth;
