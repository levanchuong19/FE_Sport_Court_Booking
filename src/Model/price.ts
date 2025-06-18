import type { Court } from "./court";

export interface Price {
    id: string;
    price: number;
    court: Court;
    priceType: string;
}