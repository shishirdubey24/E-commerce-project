import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
//import FetchItems from "../components/Fetchitems";
//import MenProduct from "../components/MenProductFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeUI from "../components/UI/HomeUI";
import MenUI from "../components/UI/MenUI";
function App() {
   console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
     <Header/>
     
      <HomeUI/>
      
       <MenUI/>
       <main className="main-content">
        <Outlet /> {/* Dynamically loads route content, e.g., Home */}
      </main>
      <Footer />
   
    
   
    </>
  )
}

export default App
