/* eslint-disable react/prop-types */
//import { GrAddCircle } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
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
    <div
    style={{
      flex: "1 1 calc(25% - 20px)", // 4 items in a row with spacing
      margin: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      textAlign: "center",
      boxSizing: "border-box",
    }}
    >
      <img
        src={image}
        alt={title}
         loading="lazy"
        style={{
          width: "50%", 
          height: "50vh", 
          objectFit: "cover", 
          borderRadius: "5px", 
        }}
      />
      <div style={{ fontWeight: "bold", fontSize: "16px", margin: "10px 0" }}>
        {title}
      </div>
      <div style={{ color: "#555", fontSize: "14px" }}>${price}</div>
      <div style={{ fontSize: "12px", color: "#888", margin: "5px 0" }}>
        {category}
      </div>
      <div style={{ fontSize: "12px", color: "#888" }}>
        Rating: {rating.rate} ({rating.count} reviews)
      </div>
      <button
        onClick={handleData}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Bag
      </button>
    </div>
  );
};

export default ShowMendata;