import Topbar from "../components/Admin/Topbar";
import Products from "../components/Admin/Hook/Products";
import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";

function AdminLoader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="h-8 w-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
    </div>
  );
}
export default function Admin() {

  const auth = useSelector((state) => state.auth || {});
  const isAdmin = auth.role==="admin";
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
 return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Products />
      
      <Topbar />
      
      {/* Full width content - no sidebar */}
      <div className="pt-14">
        <div className="w-full p-6 lg:p-8">
          {/* 3. Suspense added to handle lazy-loaded sub-pages */}
          <Suspense fallback={<AdminLoader />}>
            <Outlet /> 
          </Suspense>
        </div>
      </div>
    </div>
  );
}
