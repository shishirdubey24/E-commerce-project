/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
   
const Homeitem = ({ item }) => {
  const dispatch = useDispatch();
  const bagitems = useSelector(store => store.bag) || []; // Fallback to an empty array
  const elementFound = bagitems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
   
    dispatch(bagActions.addToBag(item));
  };

  const handleRemove = () => {
    console.log("Remove button clicked for item ID:", item.id);
    dispatch(bagActions.removeFromBag(item.id));
  };

  if (!item) {
    return <div>No item available</div>; // Handle case where item is undefined
  }

  const { image, rating, company, item_name, current_price, original_price, discount_percentage } = item;

  return (
    <div className="item-container">
      <img className="item-image" src={image} alt="item image" />
      <div className="rating">
        {rating?.stars ?? 'N/A'} ⭐ | {rating?.count ?? 0}
      </div>

      <div className="company-name">{company}</div>
      <div className="item-name">{item_name}</div>
      <div className="price">
        <span className="current-price">Rs {current_price}</span>
        <span className="original-price">Rs {original_price}</span>
        <span className="discount">({discount_percentage}% OFF)</span>
      </div>
      {elementFound ? (
        <button
          type="button"
          className="btn btn-add-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};


export default Homeitem;