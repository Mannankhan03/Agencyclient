import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
});

const userschema = mongoose.model("User", UserSchema);

export default userschema;
