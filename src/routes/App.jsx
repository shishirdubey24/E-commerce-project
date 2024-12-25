import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/Fetchitems";
import MenProduct from "../components/MenProductFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
   console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
     <Header/>
     <FetchItems/>
       <MenProduct/>
    <Outlet/>
    
    <Footer/>
    </>
  )
}

export default App
