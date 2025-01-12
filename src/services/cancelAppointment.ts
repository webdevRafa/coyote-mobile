import { db } from "../firebase"; // Update path if necessary
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export const cancelAppointment = async (
  appointmentId: string,
  appointmentDate: Timestamp | string,
  slot: string
): Promise<void> => {
  try {
    // Convert appointmentDate to Firestore Timestamp if necessary
    const date =
      typeof appointmentDate === "string"
        ? Timestamp.fromDate(new Date(appointmentDate))
        : appointmentDate;

    const appointmentDateString = date.toDate().toISOString().split("T")[0];
    console.log("Targeting document ID:", appointmentDateString);

    // Step 1: Delete the appointment from the bookings collection
    const bookingDocRef = doc(db, "bookings", appointmentId);
    await deleteDoc(bookingDocRef);
    console.log("Appointment deleted successfully");

    // Step 2: Fetch the availableSlots document
    const availableSlotDocRef = doc(db, "availableSlots", appointmentDateString);
    const availableSlotDoc = await getDoc(availableSlotDocRef);
    console.log("Received slot:", slot);

    if (availableSlotDoc.exists()) {
      const currentSlots = availableSlotDoc.data().slots;

      if (currentSlots && currentSlots[slot] === "booked") {
        // Update the specific time slot to "available"
        currentSlots[slot] = "available";
        await updateDoc(availableSlotDocRef, { slots: currentSlots });
        console.log(`Time slot ${slot} on ${appointmentDateString} is now available.`);
      } else {
        console.error(`Time slot ${slot} is not booked or does not exist.`);
      }
    } else {
      console.error(`No document found for ID: ${appointmentDateString}`);
    }
  } catch (error) {
    console.error("Error canceling appointment and updating available slots:", error);
  }
};
