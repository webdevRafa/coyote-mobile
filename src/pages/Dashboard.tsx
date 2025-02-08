import React, { useEffect, useState } from "react";
import { Appointment, formatDateTime } from "../utilities/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { UserCard } from "../components/UserCard";
import { AppointmentList } from "../components/AppointmentList";
import logo from "../assets/logo.png";
import { SignIn } from "../components/SignIn";
import { ManageAvailability } from "../components/ManageAvailability";

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [manager, setManager] = useState<"appointments" | "availability">(
    "appointments"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">(
    "pending"
  );
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [completedAppointments, setCompletedAppointments] = useState<
    Appointment[]
  >([]);

  const handleNotesChange = (appointmentId: string, newNote: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [appointmentId]: newNote,
    }));
  };
  // Function to fetch appointments
  const fetchAppointments = async (userId: string) => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      const fetchedAppointments: Appointment[] = querySnapshot.docs.map(
        (doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            date: data.date, // Correctly fetch the `date` field
            slot: data.slot || "Unknown Slot",
            serviceId: data.serviceId || "Unknown Service",
            status: data.status || "Pending",
            reasonForVisit: data.reasonForVisit || "No reason provided",
            createdAt: data.createdAt?.toDate?.() || data.createdAt || null,
          } as Appointment;
        }
      );

      console.log("Fetched Appointments:", fetchedAppointments);
      setAppointments(fetchedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments");
    }
  };

  // Fetch all appointments
  const fetchAllAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));

      const allAppointments: Appointment[] = (
        await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            // Ensure userId exists in the booking document
            if (!data.userId) {
              console.warn("Missing userId in appointment:", docSnap.id);
              return null; // Return null for missing userId
            }

            // Fetch user details from the "users" collection
            const userRef = doc(db, "users", data.userId);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : null;

            // Ensure userData exists before adding to the object
            return {
              id: docSnap.id,
              appointmentDate: data.appointmentDate || null,
              timeSlot: data.slot || "Unknown Slot",
              date: data.date || "Unknown Date",
              createdAt: data.createdAt,
              serviceId: data.serviceId || "Unknown Service",
              status: data.status || "Pending",
              reasonForVisit: data.reasonForVisit || "No reason provided",
              painLevel: data.painLevel || "No pain provided",
              slot: data.slot || "Unknown Slot",
              firstName: userData?.firstName ?? "Unknown",
              lastName: userData?.lastName ?? "User",
            } as Appointment;
          })
        )
      ).filter(
        (appointment): appointment is Appointment => appointment !== null
      );

      setAppointments(allAppointments);
    } catch (err) {
      console.error("Error fetching all appointments:", err);
      setError("Failed to fetch appointments");
    }
  };

  // Fetch completed appointments
  const fetchCompletedAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "completedBookings"));

      const completed: Appointment[] = (
        await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            if (!data.userId) {
              console.warn(
                "Missing userId in completed appointment:",
                docSnap.id
              );
              return null; // Skip if there's no userId
            }

            // Fetch user details from the "users" collection
            const userRef = doc(db, "users", data.userId);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.exists() ? userSnap.data() : null;

            return {
              id: docSnap.id,
              date: data.date || "Unknown Date",
              slot: data.slot || "Unknown Slot",
              serviceId: data.serviceId || "Unknown Service",
              status: data.status || "Completed",
              reasonForVisit: data.reasonForVisit || "No reason provided",
              painLevel: data.painLevel || "No pain provided",
              appointmentDate: data.appointmentDate || data.date || null,
              timeSlot: data.slot || "Unknown Slot",
              firstName: userData?.firstName ?? "Unknown",
              lastName: userData?.lastName ?? "User",
              notes: data.notes,
            } as Appointment;
          })
        )
      ).filter(
        (appointment): appointment is Appointment => appointment !== null
      );

      setCompletedAppointments(completed);
    } catch (err) {
      console.error("Error fetching completed appointments:", err);
    }
  };

  // function to remove appointment from the state
  const handleRemoveAppointment = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment.id !== appointment.id
      )
    );
  };
  const markAppointmentComplete = async (
    appointmentId: string,
    notes: string
  ) => {
    try {
      const appointmentRef = doc(db, "bookings", appointmentId);
      const appointmentSnap = await getDoc(appointmentRef);

      if (!appointmentSnap.exists()) {
        console.error("Appointment not found!");
        return;
      }

      const appointmentData = appointmentSnap.data();
      const { date, slot } = appointmentData; // Extract date and slot info

      // Move appointment to completedBookings collection with notes
      await setDoc(doc(db, "completedBookings", appointmentId), {
        ...appointmentData,
        status: "completed",
        completedAt: new Date(), // Add timestamp for completion
        notes: notes || "no notes provided",
      });

      // Delete the original appointment from "bookings"
      await deleteDoc(appointmentRef);

      // Free up the slot in availableSlots
      const availableSlotRef = doc(db, "availableSlots", date);
      const availableSlotSnap = await getDoc(availableSlotRef);

      if (availableSlotSnap.exists()) {
        await updateDoc(availableSlotRef, {
          [`slots.${slot}`]: "available", // Reset slot to "available"
        });
      } else {
        console.warn("Available slot document not found for date:", date);
      }

      // Update UI: Remove the appointment from state
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment.id !== appointmentId
        )
      );

      console.log(
        "Appointment marked as complete, moved to completedBookings, and slot freed up"
      );
    } catch (err) {
      console.error("Error marking appointment as complete:", err);
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
        setError(null);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists() && isMounted) {
            const userData = userDoc.data();
            setUserData(userData);

            if (userData.role === "doctor") {
              // Fetch all bookings and completed bookings for doctors
              await Promise.all([
                fetchAllAppointments(),
                fetchCompletedAppointments(),
              ]);
            } else {
              // Fetch only the user's bookings
              await fetchAppointments(currentUser.uid);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          if (isMounted) setError("Failed to fetch data");
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        if (isMounted) {
          setUser(null);
          setUserData(null);
          setAppointments([]);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
      unsubscribe();
    };
  }, []);

  if (loading)
    return (
      <div className="w-full h-[100vh] bg-gray flex items-center justify-center"></div>
    );
  if (!user) {
    return (
      <div className="w-full mt-[100px] text-gray font-mono text-center py-[60px] md:py-[180px] pl-1">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center md:gap-20 md:flex-row">
            <img src={logo} className="mb-5 size-52 mx-auto" alt="" />
            <div className="w-[90%] md:w-full mx-auto">
              <p>{error}</p>
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (userData?.role === "doctor") {
    return (
      <div className="py-[100px]">
        {/*  TOGGLE BETWEEN APPOINTMENTS AND AVAILABILITY */}
        <div className="w-full text-white py-2  max-w-[300px] mx-auto flex items-center justify-center text-center gap-3 mb-20">
          <button
            className={`py-2 px-4 font-poppins rounded-md ${
              manager === "appointments" ? "bg-sky" : "bg-gray"
            }`}
            onClick={() => setManager("appointments")}
          >
            Appointments
          </button>
          <button
            className={`py-2 px-4 font-poppins rounded-md ${
              manager === "availability" ? "bg-sky" : "bg-gray"
            }`}
            onClick={() => setManager("availability")}
          >
            Availability
          </button>
        </div>
        {/* CONDITIONALLY SHOW APPOINTMENTS */}
        {manager === "appointments" && (
          <>
            {/* MANAGE APPOINTMENTS */}
            <div>
              <h1 className="text-white text-center mb-5 text-2xl font-poppins">
                MANAGE APPOINTMENTS
              </h1>
              {/* Toggle Buttons */}
              <div className="flex justify-center gap-2 mb-5">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 font-bona rounded-md ${
                    activeTab === "pending"
                      ? "bg-sky text-white"
                      : "text-white bg-gray"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-4 py-2 font-bona rounded-md ${
                    activeTab === "completed"
                      ? "bg-sky text-white"
                      : "bg-gray text-white"
                  }`}
                >
                  Completed
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
                {activeTab === "pending" &&
                  appointments.map((doc) => (
                    <div
                      key={doc.id}
                      className="cursor-pointer rounded-md  bg-gray p-3 shadow-md border-2 border-dark-gray hover:border-sky"
                    >
                      <h1 className="text-left text-white py-2 px-1 mb-2">
                        <span className="text-sky font-bona">
                          Reason for Visit:
                        </span>{" "}
                        <span className="bg-dark-gray p-2 rounded-md">
                          {doc.reasonForVisit}
                        </span>
                      </h1>
                      {/* Appointment Info */}
                      <div className="bg-shade-gray p-4">
                        <p className="text-white">
                          User: {doc.firstName} {doc.lastName}
                        </p>
                        <p className="text-white text-left">
                          Date: {formatDateTime(doc.date) || "Unknown Date"}
                        </p>
                        <p className="text-white text-left">
                          Time: {doc.slot || "Unknown Slot"}
                        </p>{" "}
                        <p className="text-white text-left">
                          Pain Level: {doc.painLevel}
                        </p>
                        <p className="text-white text-left">
                          Reason for Visit: {doc.reasonForVisit}
                        </p>
                      </div>
                      {/* Chriropractor Notes Input */}
                      <textarea
                        className="w-full mt-2 p-2 rounded bg-dark-gray font-bona text-white"
                        placeholder="Add chiropractor notes..."
                        value={notes[doc.id] || ""}
                        onChange={(e) =>
                          handleNotesChange(doc.id, e.target.value)
                        }
                      ></textarea>
                      <button
                        onClick={() =>
                          markAppointmentComplete(doc.id, notes[doc.id])
                        }
                        className="text-sm bg-blue font-bona hover:bg-sky transition ease-in-out duration-300 rounded-sm mt-5 p-2 shadow-md"
                      >
                        MARK COMPLETE
                      </button>
                    </div>
                  ))}
              </div>
              <div className="mx-auto max-w-[1200px]">
                {activeTab === "completed" &&
                  completedAppointments.map((doc) => (
                    <div
                      key={doc.id}
                      className="cursor-pointer rounded-md mb-5 bg-gray p-3 shadow-md border-2 border-dark-gray hover:border-green-500"
                    >
                      <div className="bg-shade-gray p-4">
                        <p className="text-white">
                          User: {doc.firstName} {doc.lastName}
                        </p>
                        <p className="text-white text-left">
                          Date: {formatDateTime(doc.date) || "Unknown Date"}
                        </p>
                        <p className="text-white text-left">
                          Time: {doc.slot || "Unknown Slot"}
                        </p>
                        <p className="text-white text-left">
                          Reason: {doc.reasonForVisit || "Unknown Reason"}
                        </p>
                        {/* Display Chiropractor Notes */}
                        <p className="text-white text-left mt-3 bg-dark-gray p-5">
                          <span className="text-green-400">
                            Chiropractor Notes:
                          </span>{" "}
                          {doc.notes || "No notes provided"}
                        </p>
                      </div>
                      <p className="text-center text-white mt-4">
                        ✅ Completed
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
        {/* CONDITIONALLY SHOW AVAILABILITY */}
        {manager === "availability" && (
          <>
            {/* MANAGE AVAILABILITY */}
            <ManageAvailability />
          </>
        )}
      </div>
    );
  }
  return (
    <div className=" w-full mt-20 p-3">
      <UserCard user={user} userData={userData} />
      <AppointmentList
        appointments={appointments}
        onRemoveAppointment={handleRemoveAppointment}
      />
    </div>
  );
};
