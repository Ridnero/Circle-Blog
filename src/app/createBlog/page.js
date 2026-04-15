"use client";

import { useState, useEffect } from "react";
import { addDoc,collection } from "firebase/firestore";
import { db,auth } from "../../lib/firebase";
import { useAuth } from "../../lib/auth-context";
import { useRouter } from "next/navigation";

export default function CreateBlog(){
  const { user, role } = useAuth();
  const router = useRouter();
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  useEffect(() => {
    if (role && role !== "author") {
      router.push("/");
    }
  }, [role, router]);

  if (!user || role !== "author") {
    return <div className="text-center p-10">Access denied. Only authors can create blogs.</div>;
  }

  const createBlog = async ()=>{

    const user = auth.currentUser;

    await addDoc(collection(db,"blogs"),{
      title,
      content,
      authorId:user.uid,
      createdAt:new Date()
    });

    alert("Blog created");
  };

  return (
  <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">

  <h1 className="text-xl md:text-2xl font-bold mb-4">
    Write a Blog ✍️
  </h1>

      <input
           className="w-full border p-3 rounded-lg mb-4 focus:outline-blue-500 text-sm md:text-base"
    placeholder="Blog title"
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
      className="w-full border p-3 rounded-lg h-32 md:h-40 focus:outline-blue-500 text-sm md:text-base mb-4"
    placeholder="Write your story..."
        onChange={(e)=>setContent(e.target.value)}
      />

      <button
        onClick={createBlog}
className="bg-blue-500 text-white px-4 md:px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 w-full md:w-auto"      >
        Post Blog
      </button>

    </div>
  );
}