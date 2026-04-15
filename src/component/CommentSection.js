"use client";

import { useState } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export default function CommentSection({ blogId }) {

  const [text, setText] = useState("");

  const submitComment = async () => {

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login to comment");
        return;
      }

      if (!text.trim()) {
        alert("Comment cannot be empty");
        return;
      }

      // 🔥 Get user data from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      // 🔥 Always safe username
      const userName =
        userData?.nickname ||
        user.displayName ||
        user.email ||
        "Anonymous";

      await addDoc(collection(db, "comments"), {
        blogId,
        text,
        userId: user.uid,
        userName,
        createdAt: new Date(),
      });

      setText("");

    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-8 md:mt-10">

      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Add a Comment
      </h2>

      <textarea
        className="w-full border p-3 rounded-lg text-sm md:text-base h-24 md:h-32 resize-none"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitComment}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 w-full md:w-auto"
      >
        Comment
      </button>

    </div>
  );
}