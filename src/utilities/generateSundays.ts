import * as admin from "firebase-admin";

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// function to generate sundays for the next `weeks` weeks
const generateSundays = (startDate: Date, weeks: number): Date[] => {
    const sundays: Date[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < weeks; i++) {
        // Find the next Sunday
        const dayOfWeek = currentDate.getDay();
        const daysUntilSunday = (7 - dayOfWeek) % 7;
        currentDate.setDate(currentDate.getDate() + daysUntilSunday);

        // Add the Sunday to the list
        sundays.push(new Date(currentDate));

        // Move to the next week
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return sundays;
};

// Function to add Sundays to Firestore
const addAvailableSlots = async () => {
    try {
        const weeksToGenerate = 12; // change this to generate more weeks;
        const sundays = generateSundays(new Date(), weeksToGenerate);

        const defaultSlots = {
            "9:00am": "available",
            "10:00am": "available",
            "11:00am": "available",
            "1:00pm": "available",
            "2:00pm": "available",
            "3:00pm": "available",
            "4:00pm": "available",
        };

        // Loop through each Sunday and create a Firestore Document
        for (const sunday of sundays) {
            const formattedDate = sunday.toISOString().split("T")[0]; // Format as YYYY-MM-DD
            await db.collection("availableSlots").doc(formattedDate).set({
                date: formattedDate,
                slots: defaultSlots,
            });
            console.log(`Added slots for ${formattedDate}`);
        }
        console.log("All Sundays added successfully!");
    } catch (error) {
        console.error("Error adding Sundays:", error);
    }
};


// execute the function 
addAvailableSlots();