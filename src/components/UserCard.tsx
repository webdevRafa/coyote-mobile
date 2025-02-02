import { useState } from "react";
import { auth, db } from "../firebase";
import { formatPhoneNumberWithHyphens } from "../utilities/types";
import { FaWindowClose } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";

interface UserCardProps {
  user: any; // Firebase user object
  userData: any; // Additional user data from Firestore
}

export const UserCard: React.FC<UserCardProps> = ({ user, userData }) => {
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || user?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    address: {
      street: userData?.address?.street || "",
      city: userData?.address?.city || "",
      zipCode: userData?.address?.zipCode || "",
    },
  });

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, formData);
      alert("User information updated successfully!");

      window.location.reload();

      setUpdating(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Failed to update user information.");
    }
  };

  return (
    <div className="relative z-40 mt-10 rounded flex gap-2 justify-between max-w-[1200px] mx-auto items-start uppercase font-mono bg-dark-gray">
      <div className="shadow-md relative fadeIn">
        <div className="p-5">
          <h2 className="text-2xl text-white pb-1 bg-dark-gray mt-1 mb-3 rounded-t-lg text-left font-bona">
            Welcome,&nbsp;
            <span className="font-bold text-sky">
              {userData?.firstName || user?.email}
            </span>
          </h2>
          <p className="text-off-white pb-1 text-sm">
            <span className="text-sky">Name:</span>&nbsp;
            {userData?.firstName || "First Name"}&nbsp;
            {userData?.lastName || "Last Name"}
          </p>
          <p className="text-white  pb-1 text-sm">
            <span className="text-sky">Number:</span>{" "}
            {formatPhoneNumberWithHyphens(userData?.phoneNumber) || "N/A"}
          </p>
          <p className="text-white  pb-1 text-sm">
            <span className="text-sky">Email:</span>{" "}
            {userData?.email || user?.email}
          </p>
          <p className="text-white pb-1 text-sm mb-4">
            <span className="text-sky">Address:</span>{" "}
            {userData?.address?.street || "Street not available"},{" "}
            {userData?.address?.city || "City not available"},&nbsp;
            {userData?.address?.zipCode || "N/A"}
          </p>
        </div>
        <button
          onClick={() => setUpdating(true)}
          className="font-bona bg-gradient-to-t from-dark-gray to-gray shadow-md text-white px-2 py-1 border-r-2 border-r-gray"
        >
          update info
        </button>
        {updating && (
          <div className="absolute z-50 top-0 left-0 w-full h-full bg-gray py-4 px-2 mt-[-10px] slideDown">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-sky text-lg font-bona">Update Your Info</h2>
              <FaWindowClose
                onClick={() => setUpdating(false)}
                className="size-7 text-white cursor-pointer"
              />
            </div>
            <form className="mt-4 bg-gray py-2 px-4 shadow-md font-bona">
              <div className="flex gap-5 space-around justify-between">
                <label className="text-white">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full my-2 p-2 rounded text-dark-gray"
                  />
                </label>
                <label className="text-white">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full my-2 p-2 rounded text-dark-gray"
                  />
                </label>
              </div>

              <label className="text-white">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full my-2 p-2 rounded text-dark-gray"
                />
              </label>
              <label className="text-white">
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full my-2 p-2 rounded text-dark-gray"
                />
              </label>
              <label className="text-white">
                Street Address:
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full my-2 p-2 rounded text-dark-gray"
                />
              </label>
              <label className="text-white">
                City:
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full my-2 p-2 rounded text-dark-gray"
                />
              </label>
              <label className="text-white">
                Zip Code:
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleInputChange}
                  className="w-full my-2 p-2 rounded text-dark-gray"
                />
              </label>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-sky px-4 py-2 my-10 rounded text-white"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={handleLogout}
          className=" p-2 text-white bg-gradient-to-b from-red to-dark-red font-bona"
        >
          Log out
        </button>
      </div>
    </div>
  );
};
