import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchAllAvailableSlots = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "availableSlots"));
    const availableSlots: { date: string; slots: Record<string, string> }[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.slots && Object.values(data.slots).includes("available")) {
        availableSlots.push({ date: doc.id, slots: data.slots });
      }
    });

    return availableSlots;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return [];
  }
};
