import { Outlet } from "react-router";
import Footer from "../components/UI/Footer"
import Header from "../components/pages/HomePage/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense } from "react";
function PageBodyLoader() {
  return (
    <div className="flex flex-col items-center justify-center my-12 py-12 w-full">
      {/* Tailwind animate-spin matching your brand color palette */}
      <div className="h-10 w-10 rounded-full border-4 border-[#ff3f6c] border-t-transparent animate-spin"></div>
      <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Loading content...
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      
      <main className="main-content">
       
        <Suspense fallback={<PageBodyLoader />}>
          <Outlet /> 
        </Suspense>
      </main>
      
      <div className="border-t border-gray-100">
        <Footer />
      </div>
    </>
  );
}

export default App
