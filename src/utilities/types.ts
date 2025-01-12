import { Timestamp } from "firebase/firestore";

export interface Appointment {
    id: string;
    appointmentDate: Timestamp | string;
    timeSlot: string;
    createdAt: Timestamp;
    serviceId: string;
    status: string;
    reasonForVisit: string;
}

export const formatDateTime = (date: Timestamp | Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString() + ", " + date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } else if (typeof date === "string") {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString() + ", " + parsedDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    } else if (date?.toDate) {
      const firebaseDate = date.toDate();
      return firebaseDate.toLocaleDateString() + ", " + firebaseDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }
    return "Invalid date";
  };