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

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">(
    "pending"
  );
  const [completedAppointments, setCompletedAppointments] = useState<
    Appointment[]
  >([]);

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
      const allAppointments: Appointment[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          appointmentDate: data.appointmentDate || null,
          timeSlot: data.slot || "Unknown Slot",
          date: data.date || "Unknown Date",
          createdAt: data.createdAt,
          serviceId: data.serviceId || "Unknown Service",
          status: data.status || "Pending",
          reasonForVisit: data.reasonForVisit || "No reason provided",
          slot: data.slot || "Unknown Slot",
        };
      });
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

      const completed: Appointment[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          date: data.date || "Unknown Date",
          slot: data.slot || "Unknown Slot",
          serviceId: data.serviceId || "Unknown Service",
          status: data.status || "Completed",
          reasonForVisit: data.reasonForVisit || "No reason provided",
          createdAt: data.createdAt?.toDate?.() || data.createdAt || null,
          appointmentDate: data.appointmentDate || data.date || null, // Ensure this field is present
          timeSlot: data.slot || "Unknown Slot", // Ensure this field is present
        };
      });

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
  const markAppointmentComplete = async (appointmentId: string) => {
    try {
      const appointmentRef = doc(db, "bookings", appointmentId);
      const appointmentSnap = await getDoc(appointmentRef);

      if (!appointmentSnap.exists()) {
        console.error("Appointment not found!");
        return;
      }

      const appointmentData = appointmentSnap.data();
      const { date, slot } = appointmentData; // Extract date and slot info

      // Move appointment to completedBookings collection
      await setDoc(doc(db, "completedBookings", appointmentId), {
        ...appointmentData,
        status: "completed",
        completedAt: new Date(), // Add timestamp for completion
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
      <div className="w-full mt-[100px]  text-gray font-mono text-center py-20 pt-5 pl-1">
        <img src={logo} className="mb-20 w-[100px] mx-auto" alt="" />
        <div className="flex items-center justify-center h-full">
          <div>
            <p className="text-sky shadow-md p-2">
              Please login to access the dashboard.
            </p>
            <p>{error}</p>
            <SignIn />
          </div>
        </div>
      </div>
    );
  }
  if (userData?.role === "doctor") {
    return (
      <div className="py-[100px] font-mono">
        <h1 className="text-white text-center mb-5 text-3xl">
          All Booked Appointments
        </h1>
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "pending"
                ? "bg-sky text-white"
                : "text-white bg-gray"
            }`}
          >
            Pending Bookings
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "completed"
                ? "bg-sky text-white"
                : "bg-gray text-white"
            }`}
          >
            Completed Bookings
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
                  <span className="text-sky">Reason for Visit:</span>{" "}
                  <span className="bg-dark-gray p-2 rounded-md">
                    {doc.reasonForVisit}
                  </span>
                </h1>
                {/* Updated to use `slot` */}
                <div className="bg-shade-gray p-4">
                  <p className="text-white">
                    User: {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-white text-left">
                    Date: {formatDateTime(doc.date) || "Unknown Date"}
                  </p>
                  <p className="text-white text-left">
                    Time: {doc.slot || "Unknown Slot"}
                  </p>{" "}
                </div>
                <button
                  onClick={() => markAppointmentComplete(doc.id)}
                  className="bg-blue hover:bg-sky transition ease-in-out duration-300 rounded-sm mt-5 px-2 py-1 shadow-md"
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
                <h1 className="text-left text-white py-2 px-1 mb-2">
                  <span className="text-green-400">Completed Visit:</span>{" "}
                  <span className="bg-dark-gray p-2 rounded-md">
                    {doc.reasonForVisit}
                  </span>
                </h1>
                <div className="bg-shade-gray p-4">
                  <p className="text-white">
                    User: {userData.firstName} {userData.lastName}
                  </p>
                  <p className="text-white text-left">
                    Date: {formatDateTime(doc.date) || "Unknown Date"}
                  </p>
                  <p className="text-white text-left">
                    Time: {doc.slot || "Unknown Slot"}
                  </p>
                </div>
                <p className="text-center text-green-400 mt-4">✅ Completed</p>
              </div>
            ))}
        </div>
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
