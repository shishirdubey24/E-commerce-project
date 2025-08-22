// routes/Home.jsx - SIMPLE AND CLEAN
import { useSelector } from "react-redux";
import Homeitem from "../components/pages/HomePage/Homeitem";
import { HomeDataMap } from "../components/hooks/HomeDataMap";

const Home = () => {
  const items = useSelector((store) => store.items);
  const bagItems = useSelector(store => store.bag);

  return (
    <main>
      <HomeDataMap />
      
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
    </main>
  );
};

export default Home;
