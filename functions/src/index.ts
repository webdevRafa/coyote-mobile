import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Function to generate Sundays
const generateSundays = (startDate: Date, weeks: number): Date[] => {
  const sundays: Date[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < weeks; i++) {
    const dayOfWeek = currentDate.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    currentDate.setDate(currentDate.getDate() + daysUntilSunday);

    sundays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return sundays;
};

// Cloud Function to Generate Sundays and Add Available Slots
export const addAvailableSlots = functions.https.onRequest(async (req, res) => {
  try {
    const sundays = generateSundays(new Date(), 12); // Generate Sundays for the next 12 weeks
    const defaultSlots = {
      "9:00am": "available",
      "10:00am": "available",
      "11:00am": "available",
      "1:00pm": "available",
      "2:00pm": "available",
      "3:00pm": "available",
      "4:00pm": "available",
    };

    for (const sunday of sundays) {
      const formattedDate = sunday.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      await db.collection("availableSlots").doc(formattedDate).set({
        date: formattedDate,
        slots: defaultSlots,
      });
      console.log(`Added slots for ${formattedDate}`);
    }

    res.status(200).send("Available slots for Sundays added successfully!");
  } catch (error) {
    console.error("Error adding Sundays:", error);
    res.status(500).send("An error occurred while generating Sundays.");
  }
});