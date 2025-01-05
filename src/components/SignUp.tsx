import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
        fullName: name,
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
      <div className="flex items-center justify-center h-[400px] w-full">
        <div className="sign-up-form">
          <h2 className="text-3xl font-bold font-mono mb-5">GET STARTED</h2>
          {/* SIGN UP FORM */}
          <form onSubmit={handleSignUp} className="min-w-[300px]">
            {/* NAME */}
            <div className="flex justify-between my-1">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            {/* EMAIL */}
            <div className="flex justify-between my-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {/* PASSWORD */}
            <div className="flex justify-between my-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {/* CONFIRM PASSWORD */}
            <div className="flex justify-between my-1">
              <label className="mr-5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            {/* BUTTON */}
            <button
              className="block mx-auto bg-black text-white mt-5 px-2 py-1"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          {/* ERROR OR SUCCESS */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
      </div>
    </>
  );
};
