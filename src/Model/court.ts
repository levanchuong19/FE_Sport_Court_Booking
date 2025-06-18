import type { BusinessLocation } from "./businessLocation";
import type { Images } from "./image";
import type { Price } from "./price";
import type { Slot } from "./slot";
import type { User } from "./user";

export interface Court {
  id: number;
  courtName: string;
  address: string;
  images: Images[];
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  isDeleted: boolean;
  courtType: string;
  yearBuild: number;
  length: number;
  width: number;
  maxPlayers: number;
  courtManager: User;
  slots: Slot[];
  prices: Price[];
  businessLocation: BusinessLocation;
}
