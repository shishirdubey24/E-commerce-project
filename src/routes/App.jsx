import { Outlet } from "react-router";
import Footer from "../components/UI/Footer"
import Header from "../components/pages/HomePage/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {NavbarFetch} from "../components/hooks/NavbarFetch";
function App() {
  return (
    <>
     <Header/>
     {/* <NavbarFetch/>*/} 
       <main className="main-content">
        <Outlet /> {/* Dynamically loads route content, e.g., Home */}
      </main>
      <Footer />
   
    
   
    </>
  )
}

export default App
