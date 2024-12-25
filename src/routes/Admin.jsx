import  { useState } from "react";
import {  useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
const Admin = () => {
  // Accessing the Redux store
  const [product, setProduct] = useState({}); // State for the new product
  const dispatch = useDispatch();

 
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (
      !product.image ||
      !product.company ||
      !product.item_name ||
      !product.original_price ||
      !product.current_price ||
      !product.discount_percentage ||
      !product.return_period ||
      !product.delivery_date
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Dispatch the action to add the product
    dispatch(
      itemsActions.ADD_PRODUCT({
        id: Date.now().toString(),
        ...product,
      })
    );

    // Clear the form after submission
    setProduct({});
    alert("Product added successfully!");
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Welcome here as Admin!</h1>

      <form onSubmit={handleAddProduct}>
        {/** Image */}
        <div>
          <label>Image:</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={product.image || ""}
            onChange={handleChange}
            placeholder="Enter the image URL"
            required
          />
        </div>

        {/** Company */}
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            className="form-control"
            value={product.company || ""}
            onChange={handleChange}
            placeholder="Enter the company name"
            required
          />
        </div>

        {/** Item Name */}
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="item_name"
            className="form-control"
            value={product.item_name || ""}
            onChange={handleChange}
            placeholder="Enter the item name"
            required
          />
        </div>

        {/** Original Price */}
        <div>
          <label>Original Price:</label>
          <input
            type="number"
            name="original_price"
            className="form-control"
            value={product.original_price || ""}
            onChange={handleChange}
            placeholder="Enter the original price"
            required
          />
        </div>

        {/** Current Price */}
        <div>
          <label>Current Price:</label>
          <input
            type="number"
            name="current_price"
            className="form-control"
            value={product.current_price || ""}
            onChange={handleChange}
            placeholder="Enter the current price"
            required
          />
        </div>

        {/** Discount Percentage */}
        <div>
          <label>Discount Percentage:</label>
          <input
            type="number"
            name="discount_percentage"
            className="form-control"
            value={product.discount_percentage || ""}
            onChange={handleChange}
            placeholder="Enter the discount percentage"
            required
          />
        </div>

        {/** Return Period */}
        <div>
          <label>Return Period:</label>
          <input
            type="number"
            name="return_period"
            className="form-control"
            value={product.return_period || ""}
            onChange={handleChange}
            placeholder="Enter the return period"
            required
          />
        </div>

        {/** Delivery Date */}
        <div>
          <label>Delivery Date:</label>
          <input
            type="date"
            name="delivery_date"
            className="form-control"
            value={product.delivery_date || ""}
            onChange={handleChange}
            placeholder="Enter the delivery date"
            required
          />
        </div>

        {/** Submit Button */}
        <div className="btn">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Admin;
