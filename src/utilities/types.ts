import { Timestamp } from "firebase/firestore";

export interface Appointment {
    id: string;
    appointmentDate?: Timestamp | string;
    timeSlot?: string,
    date: string,
    createdAt: Timestamp;
    serviceId: string;
    status: string;
    reasonForVisit: string;
    painLevel: string;
    slot?: string;
    firstName: string;
    lastName: string;
    notes: string;
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


export const formatPhoneNumberWithHyphens = (phoneNumber: string) => {
  if (phoneNumber.length < 10) {
    return phoneNumber; // Return the original string if it's not 9 characters
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};

export const formatDateOfBirth = (date: string): string => {
  // Parse `YYYY-MM-DD` as a local date
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed

  return parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};