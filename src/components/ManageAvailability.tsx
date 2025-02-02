import React, { useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getNextDays } from "../services/getNextDays"; // Helper function

export const ManageAvailability: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const timeOptions = [
    "9:00am",
    "10:00am",
    "11:00am",
    "1:00pm",
    "2:00pm",
    "3:00pm",
    "4:00pm",
  ];

  // Handle selecting a day (Sunday, Monday, etc.)
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value);
    setSelectedDay(day);

    // **Fix: Ensure `getNextDays()` returns correct Firestore-formatted dates**
    const formattedDates = getNextDays(day, 8).map((date) => {
      const [year, month, day] = date.split("-").map(Number);

      // Strictly force UTC format (no local time shifts)
      const utcDate = new Date(Date.UTC(year, month - 1, day));

      return utcDate.toISOString().split("T")[0]; // Ensures "YYYY-MM-DD"
    });

    setAvailableDates(formattedDates);
    setSelectedDate(""); // Reset selected date
    setSelectedSlots([]); // Reset selected slots
  };

  // Handle selecting a date
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setSelectedSlots([]); // Reset slots when changing date
  };

  // Save availability to Firestore
  const handleSaveSlots = async () => {
    if (!selectedDate || selectedSlots.length === 0) {
      alert("Please select a date and at least one time slot.");
      return;
    }

    const docRef = doc(db, "availableSlots", selectedDate);
    const docSnap = await getDoc(docRef);

    const newSlots = selectedSlots.reduce((acc, slot) => {
      acc[slot] = "available";
      return acc;
    }, {} as Record<string, string>);

    try {
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          slots: { ...docSnap.data().slots, ...newSlots },
        });
      } else {
        await setDoc(docRef, {
          date: selectedDate, // Ensure Firestore stores exact date format
          slots: newSlots,
        });
      }
      alert("Availability updated successfully!");
      setSelectedSlots([]); // Clear slots after saving
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability.");
    }
  };

  return (
    <div className="p-6 bg-gray shadow-md rounded mx-auto max-w-[1400px] mt-20">
      <h2 className="text-lg text-white mb-4">Manage Availability</h2>

      {/* Select Day of the Week */}
      <label className="block text-white mb-2">Select Day of the Week:</label>
      <select
        className="w-full p-2 rounded bg-dark-gray text-white"
        value={selectedDay ?? ""}
        onChange={handleDayChange}
      >
        <option value="" disabled>
          Select a Day
        </option>
        <option value="0">Sunday</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
      </select>

      {/* Select Date Dropdown (only appears if a day is selected) */}
      {selectedDay !== null && availableDates.length > 0 && (
        <>
          <label className="block text-white mt-4">Select Date:</label>
          <select
            className="w-full p-2 rounded bg-dark-gray text-white"
            value={selectedDate}
            onChange={handleDateChange}
          >
            <option value="" disabled>
              Select a Date
            </option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {/* Force exact Firestore format in UTC */}
                {new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  timeZone: "UTC", // Ensures correct day is displayed
                })}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Select Time Slots (only appears if a date is selected) */}
      {selectedDate && (
        <>
          <h3 className="text-white mt-4">Select Available Time Slots:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {timeOptions.map((time) => (
              <button
                key={time}
                className={`p-2 rounded ${
                  selectedSlots.includes(time)
                    ? "bg-blue text-white"
                    : "bg-gray text-white"
                }`}
                onClick={() =>
                  setSelectedSlots((prev) =>
                    prev.includes(time)
                      ? prev.filter((s) => s !== time)
                      : [...prev, time]
                  )
                }
              >
                {time}
              </button>
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSlots}
            className="w-full bg-sky text-white p-3 rounded mt-4"
          >
            Save Availability
          </button>
        </>
      )}
    </div>
  );
};
