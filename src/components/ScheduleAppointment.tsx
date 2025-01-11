import { fetchAvailableSlots } from "../services/availableSlots";
import { useState, useEffect } from "react";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";

export const ScheduleAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string } | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reason, setReason] = useState<string>(""); // Added state for reason
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNextSundays = (count: number): string[] => {
    const sundays: string[] = [];
    const today = new Date();
    let date = new Date(today);

    date.setDate(date.getDate() + ((7 - date.getDay()) % 7));

    while (sundays.length < count) {
      sundays.push(date.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      date.setDate(date.getDate() + 7); // Move to the next Sunday
    }

    return sundays;
  };

  const handleDateSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;

      setIsLoading(true);
      const slots = await fetchAvailableSlots(selectedDate);
      if (slots) {
        setTimeSlots(slots);
      } else {
        setTimeSlots({});
      }
      setIsLoading(false);
    };

    fetchSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    if (!reason.trim()) {
      alert("Please provide a reason for your visit.");
      return;
    }

    const userId = auth.currentUser?.uid;

    if (!userId) {
      alert("You must be logged in to book an appointment.");
      return;
    }

    const docRef = doc(db, "availableSlots", selectedDate);
    const updatedSlots = { ...timeSlots, [selectedSlot]: "booked" };

    try {
      // Update slot availability in Firestore
      await updateDoc(docRef, { slots: updatedSlots });

      // Calculate the `Timestamp` for the appointment
      const [hours, minutes] = selectedSlot
        .replace(/(am|pm)/i, "")
        .split(":")
        .map(Number);
      const isPM = selectedSlot.toLowerCase().includes("pm");
      const adjustedHours =
        isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours;

      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(adjustedHours, minutes, 0, 0);
      const appointmentTimestamp = Timestamp.fromDate(appointmentDate);

      // Add booking details to the bookings collection
      const bookingsRef = collection(db, "bookings");
      const bookingData = {
        userId,
        appointmentDate: appointmentTimestamp, // Store as Firestore Timestamp
        slot: selectedSlot,
        serviceId: "massage_therapy", // Example service ID
        reasonForVisit: reason.trim(), // Include user input
        status: "confirmed",
        createdAt: Timestamp.now(), // Timestamp for when the booking is created
      };

      await addDoc(bookingsRef, bookingData);

      // Success notification and UI update
      alert("Appointment successfully booked!");
      setTimeSlots(updatedSlots);
      setSelectedSlot(null);
      setReason(""); // Clear the reason field
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Error booking the appointment. Please try again.");
    }
  };

  const nextSundays = getNextSundays(8);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Pick a good day & time</h2>

      {/* Dropdown for Sundays */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Select a Date (Next 8 Sundays):</h3>
        <select
          className="border p-2 rounded w-full"
          value={selectedDate || ""}
          onChange={handleDateSelection}
        >
          <option value="" disabled>
            Select a Sunday
          </option>
          {nextSundays.map((date) => (
            <option key={date} value={date}>
              {new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {/* Input for Reason for Visit */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Reason for Visit:</h3>
        <textarea
          className="border p-2 rounded w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for your visit..."
        />
      </div>

      {/* Available Time Slots */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Available Time Slots</h3>
        {isLoading ? (
          <p>Loading slots...</p>
        ) : timeSlots ? (
          <ul className="grid grid-cols-2 gap-2">
            {Object.entries(timeSlots)
              .sort(([timeA], [timeB]) => {
                const parseTime = (time: string) => {
                  const [hours, minutes] = time
                    .replace(/(am|pm)/i, "")
                    .split(":")
                    .map(Number);
                  return time.includes("pm") && hours !== 12
                    ? (hours + 12) * 60 + minutes
                    : hours * 60 + minutes;
                };
                return parseTime(timeA) - parseTime(timeB);
              })
              .map(([time, status]) => (
                <li key={time}>
                  <button
                    disabled={status === "booked"}
                    onClick={() => setSelectedSlot(time)}
                    className={`p-2 rounded w-full ${
                      status === "booked"
                        ? "bg-off-white text-white cursor-not-allowed"
                        : selectedSlot === time
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <p>No available slots for this date.</p>
        )}
      </div>

      {/* Book Appointment Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedSlot || !reason.trim()}
        className={`w-full bg-blue text-white p-3 rounded ${
          selectedSlot
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Book Appointment
      </button>
    </div>
  );
};
