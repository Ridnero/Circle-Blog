"use client";

import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-5 mb-4 md:mb-6 hover:shadow-lg transition">

      <h2 className="text-xl md:text-2xl text-red-500 font-semibold mb-2">
        {blog.title}
      </h2>

      <p className="text-gray-600 mb-4 text-sm md:text-base">
        {blog.content.substring(0, 120)}...
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">

        <Link
          href={`/blog/${blog.id}`}
          className="text-blue-500 font-medium text-sm md:text-base"
        >
          Read More →
        </Link>

        <span className="text-sm text-gray-400">
          {blog.likes || 0} ❤️
        </span>

      </div>
    </div>
  );
}