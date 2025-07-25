import type { Court } from "./court";
import type { User } from "./user";

export interface Slot {
  id: string;
  account: User;
  accountUsername: string;
  accountId: string;
  ownerId: string;
  courtName: string;
  court: Court;
  createAt: Date;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  slotType: string;
  status: string;
  bookingStatus: string;
  price: number;
  isDelete: boolean;
  reminderSent: boolean;
}
