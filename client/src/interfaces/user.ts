export default interface IUser {
  email: string;
  passwordHash: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
  _id: string;
}
