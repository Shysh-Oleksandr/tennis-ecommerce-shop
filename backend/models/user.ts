import mongoose, { Schema } from "mongoose";
import IUser from "./../interfaces/user";

const UserSchema: Schema = new Schema({
  // uid: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  street: { type: String, default: "" },
  apartment: { type: String, default: "" },
  zip: { type: String, default: "" },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
});

export default mongoose.model<IUser>("User", UserSchema);
