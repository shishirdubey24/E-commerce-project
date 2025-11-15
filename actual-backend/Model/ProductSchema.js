import mongoose from "mongoose";
const Schema = mongoose;
const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  item_name: { type: String },
  original_price: { type: Number },
  current_price: { type: Number },
  discount_percentage: { type: Number },
  return_period: { type: Number },
  delivery_date: { type: String },
  rating: {
    stars: { type: Number },
    count: { type: Number },
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);
export default ProductModel;
