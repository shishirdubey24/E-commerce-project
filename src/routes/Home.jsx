
import { useSelector } from "react-redux";
import Homeitem from "../components/UI/Homeitem";

const Home = () => {
    const items = useSelector((store) => store.items);
     const bagitems = useSelector(store => store.bag) || []; // Fallback to an empty array
 // const elementFound = bagitems.indexOf(item.id) >= 0;
    return (
       <main>
  <div className="items-container">
    {items.map((item) => {
      const isInBag = bagitems.includes(item.id); // or whatever logic
      return <Homeitem key={item.id} item={item} isInBag={isInBag} />;
    })}
  </div>
</main>
    );
}

export default Home;