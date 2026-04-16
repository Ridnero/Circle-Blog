"use client";

import { useEffect,useState } from "react";
import { doc,getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LikeButton from "@/component/LikeButton";
import CommentSection from "@/component/CommentSection";

export const dynamic = 'force-dynamic';

export default function BlogPage({params}){

  const {id} = params;

  const [blog,setBlog] = useState(null);

  useEffect(()=>{

    const fetchBlog = async ()=>{

      const ref = doc(db,"blogs",id);

      const snap = await getDoc(ref);

      setBlog(snap.data());
    };

    fetchBlog();

  },[id]);

//   if(!blog) return <p>Loading...</p>;

  return (
    <div className="p-10">

      <h1 className="text-3xl mb-4">
        {blog?.title}
      </h1>

      <p>{blog.content}</p>

      <div className="mt-4">
        <LikeButton blogId={id}/>
      </div>

      <CommentSection blogId={id}/>

    </div>
  );
}