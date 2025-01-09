import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
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

      const userId = userCredential.user.uid;

      // Save user data to Firestore
      await setDoc(doc(db, "users", userId), {
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        address: {
          street,
          city,
          state,
          zipCode,
        },
        reasonForVisit,
        additionalInfo,
        createdAt: new Date().toISOString(),
      });

      setSuccess("You have successfully signed up!");
      setCurrentStep(1); // Reset to first step
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="py-6 px-5 md:px-20 w-full">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSignUp}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <h2 className="text-3xl font-bold mb-5">Let's get started</h2>
              <p className="mb-5">
                This is quick and easy. First create a login and then we will
                ask for some information to get to know you a little better.
              </p>
              <h3 className="text-xl font-bold mb-4">Account Information</h3>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
            </>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <>
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
            </>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <>
              <h3 className="text-xl font-bold mb-4">Address</h3>
              <div>
                <label>Street</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
              <div>
                <label>State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
              <div>
                <label>Zip Code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
            </>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <>
              <h3 className="text-xl font-bold mb-4">Additional Information</h3>
              <div>
                <label>Reason for Visit</label>
                <textarea
                  value={reasonForVisit}
                  onChange={(e) => setReasonForVisit(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  required
                />
              </div>
              <div>
                <label>Additional Info</label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-dark-blue text-black py-2 px-4 rounded"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue text-white py-2 px-4 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green text-white py-2 px-4 rounded"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
