import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { SignUp } from "./SignUp";
import { useNavigate } from "react-router-dom";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: { [key: string]: string } = {
      "auth/invalid-email": "The email address is not valid.",
      "auth/user-disabled": "This user account has been disabled.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential":
        "Invalid credentials. Please check your input.",
      // Add more mappings as needed
    };

    // return the matching erorr message or a default fallback message
    return (
      errorMessages[errorCode] ||
      "An unexpected error occured. Please try again."
    );
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // firebase authentication
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user signed in:", userCredential.user);
      navigate("/dashboard");
      // Redirect user or show success message here
    } catch (error: any) {
      setError(getErrorMessage(error.code)); //custom error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full text-dark-gray slideRight">
        {hasAccount ? (
          <div className="py-6 px-5 md:px-20 w-full">
            <h2 className="text-2xl md:text-3xl font-poppins mb-5 text-soft-blue">
              SIGN IN
            </h2>
            {error && <p className="text-red text-sm mb-4">{error}</p>}

            <form onSubmit={handleSignIn} className="space-y-4">
              {/* EMAIL INPUT */}
              <div>
                <label
                  htmlFor="email"
                  className="font-poppins block text-white text-left"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-soft-blue w-full  p-2 border border-gray rounded font-poppins"
                  required
                />
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-poppins text-white text-left"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="bg-soft-blue w-full p-2 border border-gray rounded font-poppins"
                  required
                />
              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`transition font-poppins ease-in-out duration-300 w-full mx-auto ml-0 block py-2 rounded text-white ${
                  loading
                    ? "bg-gray cursor-not-allowed"
                    : "bg-blue hover:bg-dark-blue"
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <button
              onClick={() => setHasAccount(false)}
              className="text-sky mt-5 font-poppins"
            >
              don't have an account?
            </button>
          </div>
        ) : (
          <SignUp />
        )}
      </div>
    </>
  );
};
