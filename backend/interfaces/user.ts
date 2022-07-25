import { Document } from "mongoose";

export default interface IUser extends Document {
  // uid: string;
  email: string;
  passwordHash: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
}
