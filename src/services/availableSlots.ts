import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchAvailableSlots = async (date: string) => {
  if (!date) {
    console.error("Invalid date provided to fetchAvailableSlots");
    return null;
  }

  const docRef = doc(db, "availableSlots", date);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const slots = docSnap.data()?.slots;
    if (slots) {
      console.log(`Fetched slots for ${date}:`, slots);
      return slots;
    } else {
      console.warn(`No slots found for ${date}`);
      return null;
    }
  } else {
    console.warn(`No document found for date: ${date}`);
    return null;
  }
};