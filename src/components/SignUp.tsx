import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  formatPhoneNumberWithHyphens,
  formatDateOfBirth,
} from "../utilities/types";

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
  const [zipCode, setZipCode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirming, setConfirming] = useState(false);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (currentStep < 4) return;

    // Validation
    if (!firstName || !email || password !== confirmPassword) {
      setError(
        "Please complete all required fields and make sure passwords match!"
      );
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
          zipCode,
        },
        additionalInfo,
        createdAt: new Date().toISOString(),
      });

      setSuccess("You have successfully signed up!");
      setCurrentStep(1); // Reset to first step
      setConfirming(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setDateOfBirth("");
      setStreet("");
      setCity("");
      setZipCode("");
      setAdditionalInfo("");
      setCurrentStep(1); // Reset to the first step
      setConfirming(false); // Close confirmation modal
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="relative flex items-center justify-center w-[90%] md:w-full mx-auto text-white bg-dark-gray shadow-md border-sky border-t-2 border-b-2">
      <div className="py-6 px-5 md:px-20 w-full">
        <div className="py-6 px-5 md:px-20 w-full">
          {error ? (
            <p className="text-red text-xl mb-4">{error}</p>
          ) : success ? (
            <p className="text-green text-xl mb-4">{success}</p>
          ) : null}
        </div>
        <form onSubmit={handleSignUp}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <h1 className="text-2xl text-center mb-2 font-mono">
                GET STARTED
              </h1>
              <p className="mb-5 bg-sky py-2 shadow-md text-dark-gray text-sm  font-bold text-center border-b-gray border-b-2 pb-2">
                create an account to take your next step into better health
              </p>

              <div className="flex gap-2 space-around justify-between">
                <div className="w-full">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                    required
                  />
                </div>
                <div className="w-full">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                    required
                  />
                </div>
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border rounded mb-4 text-dark-gray"
                />
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full p-2 border rounded mb-4 text-dark-gray"
                />
              </div>
            </>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <>
              <div className="slideDown">
                <h1 className="text-2xl text-center mb-2 font-mono">ADDRESS</h1>
                <p className="mb-5 bg-sky py-2 shadow-md text-dark-gray text-sm  font-bold text-center border-b-gray border-b-2 pb-2">
                  this is required for home visits
                </p>

                <div>
                  <label>Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                  />
                </div>
                <div>
                  <label>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                  />
                </div>

                <div>
                  <label>Zip Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                  />
                </div>
              </div>
            </>
          )}
          {/* Step 3 */}
          {currentStep === 3 && (
            <>
              <div className="slideRight">
                <h1 className="text-2xl text-center mb-2 font-mono">
                  ADDITIONAL INFO
                </h1>
                <p className="mb-5 bg-sky py-2 shadow-md text-dark-gray text-sm  font-bold text-center border-b-gray border-b-2 pb-2">
                  please add anything you would like to share
                </p>

                <div>
                  <textarea
                    required
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray mt-4"
                  />
                </div>
              </div>
            </>
          )}
          {/* Step 4 */}
          {currentStep === 4 && (
            <>
              <div className="slideRight">
                <h1 className="text-2xl text-center mb-2 font-mono border-b-2 border-b-gray">
                  CREATE YOUR LOGIN
                </h1>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                    required
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4 text-dark-gray"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-sky text-dark-gray font-bold py-2 px-4 rounded hover:bg-white"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-sky text-dark-gray font-bold py-2 px-4 rounded hover:bg-white"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="bg-white text-dark-gray font-bold py-2 px-4 rounded hover:bg-sky"
              >
                Sign Up
              </button>
            )}
          </div>
          {confirming && (
            <div className="absolute w-full h-full top-0 left-0 z-50 bg-gray flex flex-col items-center justify-center px-2 slideUp">
              <div>
                {error ? (
                  <p className="text-white text-md bg-dark-gray p-2 mb-4">
                    {error}
                  </p>
                ) : success ? (
                  <p className="text-green text-xl mb-4">{success}</p>
                ) : null}

                <h1 className="text-2xl mb-3">Does this look correct?</h1>
                <p className="mb-1">
                  <span className="text-sky">Name:</span> {firstName} {lastName}
                </p>
                <p>
                  <span className="text-sky">Phone: </span>
                  {formatPhoneNumberWithHyphens(phoneNumber)}
                </p>
                <p className="mb-1">
                  <span className="text-sky">Email:</span> {email}
                </p>
                <p className="mb-1">
                  <span className="text-sky">Address: </span> {street},{" "}
                  {zipCode}
                </p>
                <p className="mb-1">
                  <span className="text-sky">City: </span> {city}
                </p>
                <p className="mb-1">
                  <span className="text-sky">DOB: </span>{" "}
                  {formatDateOfBirth(dateOfBirth)}
                </p>
              </div>
              <div className="w-full flex justify-between px-10 mb-0 mt-5">
                {error ? (
                  <button
                    onClick={() => {
                      setConfirming(false);
                      setError("");
                    }}
                    className="py-2 px-4 bg-red text-white"
                  >
                    Go Back
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirming(false)}
                    className="bg-red py-2 px-4 text-white font-bold shadow-md"
                  >
                    {" "}
                    NO
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-white text-dark-gray font-bold px-4 py-1 shadow-md hover:bg-sky"
                >
                  YES, SIGN UP
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
