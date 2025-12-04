import Topbar from "../components/Admin/Topbar";
import Products from "../components/Admin/Hook/Products";
import { Outlet } from "react-router-dom";

export default function Admin() {
  
  

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
