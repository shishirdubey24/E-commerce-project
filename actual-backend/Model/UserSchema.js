import mongoose from "mongoose";
const Schema = mongoose.Schema();

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    trype: String,
    required: true,
    unique: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
