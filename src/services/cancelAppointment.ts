import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export const cancelAppointment = async (date: string, slot: string) => {
  try {
    // Step 1: Query and delete the booking
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("date", "==", date),
      where("slot", "==", slot)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No booking found for date: ${date}, slot: ${slot}`);
    }

    const bookingDoc = querySnapshot.docs[0];
    await deleteDoc(bookingDoc.ref);
    console.log(`Booking deleted for date: ${date}, slot: ${slot}`);

    // Step 2: Retrieve the `availableSlots` document
    const availableSlotsRef = doc(db, "availableSlots", date);
    const slotDoc = await getDoc(availableSlotsRef);

    if (!slotDoc.exists()) {
      throw new Error(`No availableSlots document found for date: ${date}`);
    }

    const slots = slotDoc.data()?.slots || {};
    console.log("Current slots before update:", slots);

    // Step 3: Update the specific slot status
    if (slots[slot] === "booked") {
      slots[slot] = "available"; // Set the slot status to "available"
    } else {
      console.warn(`Slot ${slot} is already available or does not exist.`);
    }

    console.log("Updated slots object:", slots);

    // Step 4: Save the updated slots back to Firestore
    await updateDoc(availableSlotsRef, { slots });
    console.log(`Slot ${slot} on date ${date} successfully updated to "available".`);
  } catch (error) {
    console.error("Error in cancelAppointment:", error);
    throw error;
  }
};
