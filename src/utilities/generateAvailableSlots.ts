import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path points to your Firebase configuration file

const generateAvailableSlots = async () => {
  const staticSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Starting date (January 12, 2025)
  const startDate = new Date("2025-01-12");
  const endDate = new Date("2025-02-28");

  // Loop through each Sunday
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 7)) {
    const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const docRef = doc(db, "availableSlots", formattedDate);

    try {
      await setDoc(docRef, {
        date: formattedDate,
        timeSlots: staticSlots,
        bookedSlots: [], // Start with no booked slots
      });
      console.log(`Document created for Sunday: ${formattedDate}`);
    } catch (error) {
      console.error(`Error creating document for ${formattedDate}:`, error);
    }
  }
};

// Execute the function
generateAvailableSlots()
  .then(() => console.log("All Sundays processed successfully."))
  .catch((error) => console.error("Error generating available slots:", error));