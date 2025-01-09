import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { create } from "ts-node";

export const PracticeSignUp: React.FC = () => {
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

        // validate if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            // create a user with firebase auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        }
    }





  return (
    <>
      <h1>hello</h1>
    </>
  );
};
