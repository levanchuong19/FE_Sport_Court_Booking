import type { Court } from "./court";
import type { User } from "./user";

export interface Slot {
    id: string;
    account: User;
    court: Court;
    createAt: Date;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    slotType: string;
    status: string;
    bookingStatus: string;
    price: number;
    isDelete: boolean;
    reminderSent: boolean;

}
