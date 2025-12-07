import Topbar from "../components/Admin/Topbar";
import Products from "../components/Admin/Hook/Products";
import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Admin() {

  const auth = useSelector((state) => state.auth || {});
  const isAdmin = !!auth.isAdmin;
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Products />
      
      <Topbar  />
      
      {/* Full width content - no sidebar */}
      <div className="pt-14">
        <div className="w-full p-6 lg:p-8">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}
