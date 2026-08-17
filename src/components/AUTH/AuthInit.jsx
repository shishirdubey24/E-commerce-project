import { useEffect  } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, sessionInitializationComplete } from "../../store/authSlice";
import axios from "axios";
import { API_BASE_URL } from "../../config/Api";
//import { LOCAL_API_URL } from "../../config/Api";
//const HOST_BASE = "https://e-commerce-project-51z6.onrender.com";

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
const syncActiveSession = async () => {
  try {
   
    const response = await axios.get(`${API_BASE_URL}/auth/jwt`, {
      withCredentials: true, 
    });
    
    if (response.data?.user) {
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    console.log("No active background session found. Proceeding as guest.",error);
  } finally {
    // Protected routes must wait until the cookie-backed session check finishes.
    dispatch(sessionInitializationComplete());
  }
};

    syncActiveSession();
  }, [dispatch]);

  return children;
};

export default AuthInit;
