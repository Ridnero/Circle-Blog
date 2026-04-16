"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import LikeButton from "../../../component/LikeButton";
import CommentSection from "../../../component/CommentSection";

export const dynamic = 'force-dynamic';

export default function BlogPage() {

  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  // 🔥 Fetch Blog
  const fetchBlog = async () => {
    try {
      const ref = doc(db, "blogs", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setBlog(snap.data());
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // 🔥 Fetch Comments (FIXED QUERY)
  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, "comments"),
        where("blogId", "==", id)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const loadBlogData = async () => {
      await fetchBlog();
      await fetchComments();
    };

    loadBlogData();
  }, [id]);

  console.log(comments)



  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto">

      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        {blog?.title}
      </h1>

      <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
        {blog?.content}
      </p>

      <LikeButton blogId={id} />

      {/* Comment Section (Form) */}
      <CommentSection blogId={id} refreshComments={fetchComments} />

      {/* Display Comments */}
      <div className="mt-8 md:mt-10">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Comments
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-3 md:p-4 rounded-lg shadow mb-3">
              <p className="text-sm md:text-base">{comment.text} <span className="font-semibold">{comment.userName}</span></p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}