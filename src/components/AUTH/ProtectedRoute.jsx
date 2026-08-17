import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

     const { isAuthenticated, isSessionInitialized } = useSelector((state) => state.auth)
      if (!isSessionInitialized) {
    return null;
  }
      if (!isAuthenticated) {
    return <Navigate to="/User/SignIn" replace />;
  }
  return <Outlet />; 
 
};

export default ProtectedRoute
