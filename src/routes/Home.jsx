
import { useSelector } from "react-redux";
import Homeitem from "../components/pages/HomePage/Homeitem";

const Home = () => {
    const items = useSelector((store) => store.items);
     const bagitems = useSelector(store => store.bag) || []; 
    return (
       <main>
  <div className="items-container">
    {items.map((item) => {
      const isInBag = bagitems.includes(item.id); 
      return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
    })}
  </div>
</main>
    );
}

export default Home;