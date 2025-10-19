/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
   
const Homeitem = ({ item, isInBag }) => {
  const dispatch = useDispatch();
  
  const handleAddToBag = () => {
    // ✅ Add debug logging
    dispatch(bagActions.addToBag(item));
  };
 
  const handleRemove = () => {
    // ✅ Add debug logging
    dispatch(bagActions.removeFromBag(item.id));
  };

  if (!item) {
    return <div>No item available</div>; 
  }

  const { 
    image, 
    rating, 
    company, 
    category, 
    item_name, 
    current_price, 
    original_price, 
    discount_percentage 
  } = item;

  return (
    <div className="item-container">
      <img 
        className="item-image" 
       src={image}
       
        alt={item_name || "Product image"} 
        loading="lazy" 
      />
      <div className="rating">
        {rating?.stars ?? 'N/A'} ⭐ | {rating?.count ?? 0}
      </div>

      <div className="company-name">{company}</div>
      <div className="company-name">{category}</div>
      <div className="item-name">{item_name}</div>
      
      <div className="price">
        <span className="current-price">₹{current_price}</span>
        <span className="original-price">₹{original_price}</span>
        <span className="discount">({discount_percentage}% OFF)</span>
      </div>
      
      {isInBag ? (
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
export default React.memo(Homeitem, (prev, next) => {
  return prev.item.id === next.item.id && prev.isInBag === next.isInBag;
});