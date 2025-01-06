import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user signed in:", userCredential.user);
      // Redirect user or show success message here
    } catch (error: any) {
      setError(getErrorMessage(error.code)); //custom error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="py-6 px-5 md:px-20 w-full">
          <h2 className="text-3xl font-bold font-mono mb-5">SIGN IN</h2>
          {error && <p className="text-red text-sm mb-4">{error}</p>}

          <form onSubmit={handleSignIn} className="space-y-4">
            {/* EMAIL INPUT */}
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
                className="w-full  p-2 border border-gray rounded"
                required
              />
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                className="w-full p-2 border border-gray rounded"
                required
              />
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`transition ease-in-out duration-300 w-[300px] mx-auto block py-2 rounded text-white ${
                loading
                  ? "bg-gray cursor-not-allowed"
                  : "bg-blue hover:bg-dark-blue"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
