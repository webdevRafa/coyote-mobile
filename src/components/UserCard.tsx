interface UserCardProps {
  user: any; // Firebase user object
  userData: any; // Additional user data from Firestore
}
import { auth } from "../firebase";
import { formatPhoneNumberWithHyphens } from "../utilities/types";

export const UserCard: React.FC<UserCardProps> = ({ user, userData }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-4 rounded flex justify-between">
      <div className="shadow-md p-2 md:p-5">
        <h2 className="text-3xl text-white">
          Welcome,
          <span className="font-bold text-sky">
            {userData?.firstName || user?.email}
          </span>
        </h2>
        <p className="text-off-white">
          <span className="text-sky">Name:</span>&nbsp;
          {userData?.firstName || "First Name"}&nbsp;
          {userData?.lastName || "Last Name"}
        </p>
        <p className="text-white">
          <span className="text-sky">Number:</span>{" "}
          {formatPhoneNumberWithHyphens(userData?.phoneNumber) || "N/A"}
        </p>
        <p className="text-white">
          <span className="text-sky">Email:</span>{" "}
          {userData?.email || user?.email}
        </p>
        <p className="text-white">
          <span className="text-sky">Address:</span>{" "}
          {userData?.address.street || "Street not available"},{" "}
          {userData?.address.city || "City not available"}, Texas
          {userData?.address.zipCode || "N/A"}
        </p>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="bg-red p-1 rounded text-white shadow-md hover:scale-105 transition ease-in-out duration-75"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
