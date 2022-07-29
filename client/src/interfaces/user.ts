export default interface IUser {
  email: string;
  password: string;
  phone: string;
  name: string;
  isAdmin: boolean;
  street?: string;
  apartment?: string;
  zip?: string;
  city?: string;
  country?: string;
  _id: string;
}
