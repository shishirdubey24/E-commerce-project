import { BsFillPersonFill } from "react-icons/bs";
import { FaFaceGrinHearts, FaBagShopping } from "react-icons/fa6";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  useState } from "react";


const Header = () => {
  const bag = useSelector((store) => store.bag);
  const [SearchInput,setSearchInput]=useState();

const navigate = useNavigate();

  const handleSearch=(e)=>{
    setSearchInput(e.target.value);
  }
  const handleSearchIcon=()=>{
    if(SearchInput.trim()!=""){
      navigate("/search", { state: { query: SearchInput } }); 
  }
  }
  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img
            className="myntra_home"
            src="images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>
      <nav className="nav_bar">
       <Link to="/MenProduct">Men</Link>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
    - - </nav>
      <div className="search_bar">
     <div className="search_icon">  
     
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" onClick={handleSearchIcon}>
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>

     </div>
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
         value={SearchInput} onChange={handleSearch}
        />

      </div>
      <div className="action_bar">
        <div className="action_container">
          <BsFillPersonFill />
         <Link to="/User"> <span className="action_name">User</span></Link> 
        </div>

        <div className="action_container">
          <FaFaceGrinHearts />
         <Link to="/adminPannel">  <span className="action_name">Admin </span> </Link>    
        </div>

       
        <Link className="action_container" to="/bag">
     <FaBagShopping />
     <span className="action_name">Bag</span>
     {bag && bag.length > 0 && <span className="bag-item-count">{bag.length}</span>} 
   </Link>
      </div>
     
    </header>
  );
};

export default Header;