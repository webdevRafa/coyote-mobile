import { Timestamp } from "firebase/firestore";

export interface Appointment {
    id: string;
    appointmentDate: Timestamp | string;
    timeSlot: string,
    date: string,
    createdAt: Timestamp;
    serviceId: string;
    status: string;
    reasonForVisit: string;
    slot?: string;
}

export const formatDateTime = (date: string): string => {
  // Parse `YYYY-MM-DD` as a local date
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
