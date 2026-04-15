"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Signup() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader");

  const handleSignup = async () => {

    try {

      // 🔥 Create user (Auth)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 Save display name in Auth
      await updateProfile(user, {
        displayName: name,
      });

      // 🔥 Save full user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        nickname,
        email,
        role,
        createdAt: new Date(),
      });

      alert("Account created successfully 🎉");

      router.push("/");

    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen">

      {/* Left Side - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80')",
        }}
      />

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold mb-2 text-center">
            Join Circle Blog
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Create your account and start sharing your stories
          </p>

          {/* Name */}
          <input
            className="border border-gray-300 p-3 block w-full mb-4 rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Nickname */}
          <input
            className="border border-gray-300 p-3 block w-full mb-4 rounded"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          {/* Email */}
          <input
            className="border border-gray-300 p-3 block w-full mb-4 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            className="border border-gray-300 p-3 block w-full mb-4 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role */}
          <select
            className="border border-gray-300 p-3 w-full mb-6 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="reader">Reader</option>
            <option value="author">Author</option>
          </select>

          {/* Button */}
          <button
            onClick={handleSignup}
            className="bg-blue-500 hover:bg-blue-600 text-white w-full px-4 py-3 rounded font-semibold transition"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}