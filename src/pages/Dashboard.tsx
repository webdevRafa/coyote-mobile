import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
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
import logo from "../assets/logo-black_1.png";

interface Appointment {
  id: string;
  appointmentDate: string;
  serviceId: string;
  status: string;
  createdAt: string;
}

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
        setUserData(userDoc.data());
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
          const data = doc.data(); // Keep `data` as its raw Firestore structure
          return {
            id: doc.id,
            appointmentDate: data.appointmentDate.toDate().toISOString(), // Convert Timestamp to string
            createdAt: data.createdAt.toDate().toISOString(), // Convert Timestamp to string
            serviceId: data.serviceId || "Unknown Service",
            status: data.status || "Pending",
          };
        }
      );

      setAppointments(fetchedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
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

  if (loading) return <p>Loading...</p>;
  if (!user) {
    return (
      <div className="w-full bg-off-white  text-gray font-mono text-center pb-20 pt-5 pl-1">
        <img src={logo} className="mb-20 w-[100px]" alt="" />
        <div className="flex items-center justify-center h-full">
          <p className="bg-white shadow-md p-2">
            No User found. Please login to acess the Dashboard.
          </p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-off-white to-white w-full mt-20 p-3">
      <UserCard user={user} userData={userData} />
      <AppointmentList appointments={appointments} />
    </div>
  );
};
