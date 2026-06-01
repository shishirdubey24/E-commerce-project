/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import axios from "axios";
import { API_BASE_URL } from "../../config/Api";
//import { LOCAL_API_URL } from "../../config/Api";
//const HOST_BASE = "https://e-commerce-project-51z6.onrender.com";

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    // Inside AuthInit.jsx
const syncActiveSession = async () => {
  try {
    // EXPLICITLY pass withCredentials: true right here in the config object
    const response = await axios.get(`${API_BASE_URL}/auth/jwt`, {
      withCredentials: true, 
    });
    
    if (response.data?.user) {
      dispatch(loginSuccess(response.data));
    }
  } catch (error) {
    console.log("No active background session found. Proceeding as guest.",error);
  } finally {
    setIsHydrating(false);
  }
};

    syncActiveSession();
  }, [dispatch]);

  // 5. Block the UI from flashing unauthenticated states while checking the session
  if (isHydrating) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white font-sans">
        <div className="h-8 w-8 rounded-full border-2 border-[#ff3f6c] border-t-transparent animate-spin mb-3"></div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Verifying secure session...
        </p>
      </div>
    );
  }

  // Once hydration is complete (true or false), render the rest of the application
  return children;
};

export default AuthInit;