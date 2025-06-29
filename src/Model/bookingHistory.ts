import type { Slot } from "./slot";

export interface BookingHistory {
  bookings: Slot[];
  totalBookings: number;
  totalSpending: number;
  favoriteCourtType: string;
}