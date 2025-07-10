import type { Court } from "./court";
import type { Slot } from "./slot";

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
  createAt: Date;
  modifyAt: Date;
  isDelete: boolean;
  balance: number;
  courts: Court[];
  slots: Slot[];
}

export interface JwtPayload {
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  role: string;
  sub: string;
}
