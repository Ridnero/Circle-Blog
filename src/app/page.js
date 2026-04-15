"use client";

import { useEffect,useState } from "react";
import { collection,getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import BlogCard from "../component/BlogCard";

export default function Home(){

  const [blogs,setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(data);

        console.log("Blogs:", data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-4 md:p-10">

      <h1 className="text-2xl md:text-3xl mb-6">All Blogs</h1>

      <div className="grid gap-4 md:gap-6">
        {blogs.map(blog=>(
          <BlogCard key={blog.id} blog={blog}/>
        ))}
      </div>

    </div>
  );
}