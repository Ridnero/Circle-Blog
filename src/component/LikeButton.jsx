"use client";

import { doc,updateDoc,increment } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function LikeButton({blogId}){

  const likeBlog = async ()=>{

    const ref = doc(db,"blogs",blogId);

    await updateDoc(ref,{
      likes:increment(1)
    });

  };

  return (
    <button
      onClick={likeBlog}
      className="flex items-center gap-2 bg-red-100 text-red-500 px-3 md:px-4 py-2 rounded-lg hover:bg-red-200 text-sm md:text-base mb-4 md:mb-6">
  ❤️ Like
    </button>
  );
}