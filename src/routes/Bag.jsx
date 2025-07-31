
import BagItem from "../components/Bag/BagItem";
import BagSummary from "../components/Bag/BagSummery";

import { useSelector } from "react-redux";

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {bagItems.map((item) => (
            <BagItem key={item.id} item={item} />
          ))}
        </div>
       
        <BagSummary />
      </div>
    </main>
  );
};

export default Bag;
