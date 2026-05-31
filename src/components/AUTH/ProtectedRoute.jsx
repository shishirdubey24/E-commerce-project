import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

     const isAuthenticated=useSelector((state) => state.auth || {})
      if (!isAuthenticated) {
    return <Navigate to="/User/SignIn" replace />;
  }
  return <Outlet />; 
 
};

export default ProtectedRoute
