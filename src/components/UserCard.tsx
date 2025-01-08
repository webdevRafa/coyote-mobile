interface UserCardProps {
  user: any; // Firebase user object
  userData: any; // Additional user data from Firestore
}
import { auth } from "../firebase";

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
    <div className="p-4 bg-white rounded shadow-md flex justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray">
          Welcome, {userData?.firstName || user.email}
        </h2>
        <p className="text-blue">Email: {user?.email}</p>
        <p>
          Account created:{" "}
          {userData?.createdAt
            ? new Date(userData?.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="bg-blue p-1 rounded text-white shadow-md hover:bg-dark-blue hover:scale-105 transition ease-in-out duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
