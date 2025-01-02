/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

const FilteredItem = ({ filtereditem }) => {
  console.log("Rendering FilteredItem for:", filtereditem); // Add this log

  // Hooks must always be called unconditionally
  const dispatch = useDispatch();
  const bagitems = useSelector((store) => store.bag) || []; // Fallback to an empty array

  // Return early if `filtereditem` is undefined
  if (!filtereditem) {
    return <div>No item available</div>;
  }

  const elementFound = bagitems.indexOf(filtereditem.id) >= 0;

  const handleAddToBag = () => {
    console.log("Add to Bag clicked for:", filtereditem.id); // Debugging log
    dispatch(bagActions.addToBag(filtereditem));
  };

  const handleRemove = () => {
    console.log("Remove button clicked for:", filtereditem.id); // Debugging log
    dispatch(bagActions.removeFromBag(filtereditem.id));
  };

  const {
    image,
    rating,
    company,
    category,
    item_name,
    current_price,
    original_price,
    discount_percentage,
  } = filtereditem;

  return (
    <div className="filtered-item-container">
      <img className="filtered-item-image" src={image} alt="item image" />
      <div className="filtered-rating">
        {rating?.stars ?? "N/A"} ⭐ | {rating?.count ?? 0}
      </div>

      <div className="filtered-company-name">{company}</div>
      <div className="filtered-category">{category}</div>

      <div className="filtered-item-name">{item_name}</div>
      <div className="filtered-price">
        <span className="filtered-current-price">Rs {current_price}</span>
        <span className="filtered-original-price">Rs {original_price}</span>
        <span className="filtered-discount">({discount_percentage}% OFF)</span>
      </div>
      {elementFound ? (
        <button
          type="button"
          className="btn filtered-btn-add-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete /> Remove
        </button>
      ) : (
        <button
          type="button"
          className="btn filtered-btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Add to Bag
        </button>
      )}
    </div>
  );
};

export default FilteredItem;
