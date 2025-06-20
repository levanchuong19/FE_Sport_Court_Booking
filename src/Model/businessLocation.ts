import type { Court } from "./court";
import type { User } from "./user";

export interface BusinessLocation {
    id: string;
    name: string;
    address: string;
    openTime: string;
    closeTime: string;
    owner: User;
    courts: Court[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    images: string;
    status: string;
    description: string;
    priceRange: "$";
    rating: number;
    reviews: number;
}