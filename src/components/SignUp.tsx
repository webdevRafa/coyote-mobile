import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save additional user info in Firestore
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
      });

      setSuccess("User signed up successfully!");
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="py-6 px-5 md:px-20 w-full">
          <h2 className="text-3xl font-bold font-mono mb-5">GET STARTED</h2>
          {error && <p className="text-red text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* FIRST NAME */}
            <div>
              <label htmlFor="firstName" className="block">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
                className="w-full p-2 border border-gray rounded"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label htmlFor="lastName" className="block">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                required
                className="w-full p-2 border border-gray rounded"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-2 border border-gray rounded"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-2 border border-gray rounded"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label htmlFor="confirmPassword" className="block">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full p-2 border border-gray rounded"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-[300px] mx-auto block py-2 rounded text-white bg-blue hover:bg-dark-blue transition ease-in-out duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
