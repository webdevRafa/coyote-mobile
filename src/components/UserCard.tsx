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
    <div className="p-4 rounded flex justify-between">
      <div className="shadow-md p-2 md:p-5">
        <h2 className="text-3xl text-white">
          Welcome,{" "}
          <span className="font-bold text-sky">
            {userData?.firstName || user.email}
          </span>
        </h2>
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
