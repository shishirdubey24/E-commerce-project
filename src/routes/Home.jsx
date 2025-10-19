// routes/Home.jsx - SIMPLE AND CLEAN
import { useSelector } from "react-redux";
import Homeitem from "../components/pages/HomePage/Homeitem";
import { HomeDataMap } from "../components/hooks/HomeDataMap";
import { useEffect, useState } from "react";

const Home = () => {
  const items = useSelector((store) => store.items);
console.log("Paginated items re", items.map(i => i.image));

  const bagItems = useSelector(store => store.bag);
  const[CurrentPage,setCurrentPage]=useState(1);
  const TotalPages=5;
  const itemsPerPage=20;
  
  //handle page logic
  const handlePage = (e) => {
  e.preventDefault();
  const li = e.target.closest(".page-item");
  if (!li || !li.id) return; // guard condition
  const page = Number(li.id);
  if (page >= 1 && page <= TotalPages) setCurrentPage(page);
};
useEffect(()=>{
  console.log("the current page is",CurrentPage)
},[CurrentPage])
  return (
    <main>
      <HomeDataMap currentPage={CurrentPage} itemsPerPage={itemsPerPage}/> 
      
      <div className="items-container">
        {items.length > 0 ? (
          items.map((item) => {
            const isInBag = bagItems.some(bagItem => bagItem.id === item.id);
            return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3>No products available</h3>
            <p>Loading from server...</p>
          </div>
        )}
      </div>
      {/* Added pagination feature */}
      <nav aria-label="Page navigation example " onClick={handlePage}>
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item" id="1"><a className="page-link" href="#" >1</a></li>
    <li className="page-item"id="2"><a className="page-link" href="#">2</a></li>
    <li className="page-item" id="3"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </main>
  );
};

export default Home;
