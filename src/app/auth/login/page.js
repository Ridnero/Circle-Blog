"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function Login(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginUser = async () => {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    router.push("/");
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80')"}}>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

          <input
            className="border border-gray-300 p-3 block w-full mb-4 rounded"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="border border-gray-300 p-3 block w-full mb-6 rounded"
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            onClick={loginUser}
            className="bg-green-500 hover:bg-green-600 text-white w-full px-4 py-3 rounded font-semibold transition"
          >
            Login
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don&apos;t have an account? <a href="/auth/signup" className="text-green-500 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}