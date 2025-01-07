interface UserCardProps {
  user: any; // Firebase user object
  userData: any; // Additional user data from Firestore
}

export const UserCard: React.FC<UserCardProps> = ({ user, userData }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold text-gray">
        Welcome, {userData?.firstName || user.email}
      </h2>
      <p className="text-blue">Email: {user?.email}</p>
      <p>
        Account created: {new Date(userData?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};
