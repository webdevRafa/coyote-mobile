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

export const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }

          // Fetch user appointments from Firestore
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const fetchedAppointments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setAppointments(fetchedAppointments);
        } catch (error) {
          console.error("Error fetching user data or appointments:", error);
        }
      } else {
        setUser(null);
        setUserData(null);
        setAppointments([]); // Clear appointments if the user logs out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gradient-to-b from-off-white to-white w-full mt-20 p-3">
      <UserCard user={user} userData={userData} />
      <AppointmentList appointments={appointments} />
    </div>
  );
};
