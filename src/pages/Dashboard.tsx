import React, { useEffect, useState } from "react";
import { Appointment, formatDateTime } from "../utilities/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
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

  // Function to fetch user data
  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        if (data.role === "doctor") {
          fetchAllAppointments(); // Fetch all the appointments for the doctor
        } else {
          fetchAppointments(userId); // Fetch only the user's booking's
        }
      } else {
        console.warn("User document doesn't exist");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    }
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

  // function to remove appointment from the state
  const handleRemoveAppointment = () => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment.id !== appointment.id
      )
    );
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
        setError(null);

        try {
          await Promise.all([
            fetchUserData(currentUser.uid),
            fetchAppointments(currentUser.uid),
          ]);
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
      isMounted = false; // Set the flag to false on unmount
      unsubscribe();
    };
  }, []);

  if (loading)
    return <div className="w-full h-[100vh] bg-gray">loading...</div>;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
          {appointments.map((doc) => (
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
              <button className="bg-blue hover:bg-sky transition ease-in-out duration-300 rounded-sm mt-5 px-2 py-1 shadow-md">
                MARK COMPLETE
              </button>
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
