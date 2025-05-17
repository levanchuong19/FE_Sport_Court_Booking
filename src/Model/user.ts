export interface User {
  id: string;
  fullName: string;
  dateOfBirth: Date;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  email: string;
  password: string;
  image: string;
  address: string;
  role: "GUEST" | "CUSTOMER" | "MANAGER" | "STAFF" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}