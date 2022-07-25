import { Document } from "mongoose";

export default interface ICategory extends Document {
  name: string;
  color: string;
  icon: string;
  image: string;
  id: string;
}
