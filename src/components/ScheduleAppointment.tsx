import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { Timestamp } from "firebase/firestore";

// Fetch only available slots from Firestore
const fetchAllAvailableSlots = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "availableSlots"));
    const availableSlots: { date: string; slots: Record<string, string> }[] =
      [];

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

export const ScheduleAppointment: React.FC = () => {
  const [availableDates, setAvailableDates] = useState<
    { date: string; slots: Record<string, string> }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<Record<string, string> | null>(
    null
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const [painLevel, setPainLevel] = useState<string>("0");
  const [screen, setScreen] = useState<boolean>(false);

  // Load available slots from Firestore
  useEffect(() => {
    const loadAvailableSlots = async () => {
      const slots = await fetchAllAvailableSlots();
      setAvailableDates(slots);
    };
    loadAvailableSlots();
  }, []);

  // **Fix: Correct Date Formatting to Stop Shifting**
  const formatDate = (dateString: string) => {
    // Extract year, month, and day from Firestore's "YYYY-MM-DD"
    const [year, month, day] = dateString.split("-").map(Number);

    // Create a Date object in strict UTC format
    const dateObject = new Date(Date.UTC(year, month - 1, day));

    // **Force the correct day of the week by manually extracting it**
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dateObject.getUTCDay()];

    return `${weekday}, ${month}/${day}/${year}`;
  };

  // Handle selecting a date
  const handleDateSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    const selectedSlotData = availableDates.find((d) => d.date === date);
    setTimeSlots(selectedSlotData ? selectedSlotData.slots : null);
  };

  // Booking an appointment (Preserving All Booking Logic)
  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      alert("Please select a date and time slot.");
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

    // Convert pain level to number and check screening requirement
    const painLevelNumber = parseInt(painLevel, 10);
    if (painLevelNumber >= 8) {
      setScreen(true);
      return;
    }

    const docRef = doc(db, "availableSlots", selectedDate);

    try {
      // Fetch the latest version of the document to avoid overwriting existing slots
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("Error: Selected date does not exist.");
        return;
      }

      const existingSlots = docSnap.data().slots || {}; // Preserve existing slots

      // Update only the selected slot while keeping other slots unchanged
      const updatedSlots = { ...existingSlots, [selectedSlot]: "booked" };

      // Update Firestore with the modified slot data
      await updateDoc(docRef, { slots: updatedSlots });

      // Add booking details to the "bookings" collection
      const bookingsRef = collection(db, "bookings");
      await addDoc(bookingsRef, {
        userId,
        date: selectedDate,
        slot: selectedSlot,
        serviceId: "massage_therapy",
        reasonForVisit: reason.trim(),
        painLevel: painLevel,
        status: "confirmed",
        createdAt: Timestamp.now(),
      });

      alert("Appointment successfully booked!");
      setTimeSlots(updatedSlots); // Update local state
      setSelectedSlot(null);
      setReason("");
    } catch (error) {
      console.error("Error during booking:", error);
      alert("Error booking the appointment. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray shadow-md rounded relative">
      {screen && (
        <div className="absolute top-0 w-full h-full left-0 bg-dark-gray flex items-center justify-center">
          <div>
            <h1 className="text-white text-lg font-bona">
              Your pain level is too high. Please get a medical screening prior
              to booking.
            </h1>
            <button
              onClick={() => setScreen(false)}
              className="bg-sky py-1 px-4 mx-auto block mt-3"
            >
              return
            </button>
          </div>
        </div>
      )}
      <h2 className="text-md md:text-lg text-white bg-dark-gray text-center py-5 my-5">
        Schedule an Appointment
      </h2>

      {/* Dropdown for Available Dates */}
      <div className="mb-4">
        <h3 className="text-sky font-poppins">CHECK AVAILABILITY</h3>
        <h3 className="font-semibold mb-2 text-white">Select a Date:</h3>
        <select
          className="border p-2 rounded w-full"
          value={selectedDate || ""}
          onChange={handleDateSelection}
        >
          <option value="" disabled>
            Select a Date
          </option>
          {availableDates
            .filter((dateObj) =>
              Object.values(dateObj.slots).includes("available")
            ) // Strictly Filter Only Dates That Exist
            .map((dateObj) => (
              <option key={dateObj.date} value={dateObj.date}>
                {formatDate(dateObj.date)}
              </option>
            ))}
        </select>
      </div>

      {/* Display Available Time Slots */}
      {selectedDate && timeSlots && (
        <div className="mb-4">
          <h3 className="text-md md:text-lg my-5 bg-dark-gray text-center py-5 text-white">
            Available Time Slots
          </h3>
          <ul className="grid grid-cols-2 gap-2 text-white">
            {Object.entries(timeSlots)
              .filter(([_, status]) => status === "available") // Only show available slots
              .sort(([timeA], [timeB]) => {
                // Convert time format "9:00am" into a comparable 24-hour format
                const convertTo24Hour = (time: string) => {
                  const [hourMinute, period] = time.split(/(am|pm)/);
                  let [hours, minutes] = hourMinute.split(":").map(Number);
                  if (period === "pm" && hours !== 12) hours += 12;
                  if (period === "am" && hours === 12) hours = 0;
                  return hours * 60 + minutes; // Convert to minutes for sorting
                };
                return convertTo24Hour(timeA) - convertTo24Hour(timeB);
              })
              .map(([time]) => (
                <li key={time}>
                  <button
                    onClick={() => setSelectedSlot(time)}
                    className={`p-2 rounded w-full ${
                      selectedSlot === time
                        ? "bg-blue text-white"
                        : "bg-gray hover:bg-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Booking Section */}
      {selectedSlot && (
        <>
          <div className="mb-4">
            <h3 className="text-white">Reason for Visit:</h3>
            <textarea
              className="border p-2 rounded w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly describe your reason for the visit"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-white">Pain Level (0-10):</h3>
            <select
              className="border p-2 rounded w-full"
              value={painLevel}
              onChange={(e) => setPainLevel(e.target.value)}
            >
              {[...Array(11).keys()].map((num) => (
                <option key={num} value={num.toString()}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBooking}
            className="bg-blue text-white p-3 rounded w-full"
          >
            Book Appointment
          </button>
        </>
      )}
    </div>
  );
};
