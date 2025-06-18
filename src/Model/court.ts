import type { Slot } from "./slot";
import type { User } from "./user";

export interface Court {
    id: number;
    courtName: string;
    address: string;
    price: number;
    image: string[];
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
    images: string[];
    courtManager: User;
    slots: Slot[];
    prices: number[];
    businessLocation: string;
}
