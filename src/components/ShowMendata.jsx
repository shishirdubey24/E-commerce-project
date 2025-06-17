/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import "./ShowMendata.css"
const ShowMendata = ({ mendata }) => {
  const dispatch = useDispatch();

  if (!mendata || !mendata.id) {
    return <div>No item available or item ID is undefined</div>;
  }

  const handleData = () => {
    const normalizedItem = {
      id: mendata.id,
      title: mendata.title,
      price: mendata.price,
      category: mendata.category,
    };
    dispatch(bagActions.addToBag(normalizedItem));
  };

  const { title, price, category, image, rating } = mendata;

  return (
    <div className="show-mendata-card">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="show-mendata-image"
      />
      <div className="show-mendata-title">{title}</div>
      <div className="show-mendata-price">${price}</div>
      <div className="show-mendata-category">{category}</div>
      <div className="show-mendata-rating">
        Rating: {rating?.rate ?? "N/A"} ({rating?.count ?? 0} reviews)
      </div>
      <button className="show-mendata-button" onClick={handleData}>
        Add to Bag
      </button>
    </div>
  );
};

export default ShowMendata;
