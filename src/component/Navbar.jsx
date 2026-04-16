"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../lib/auth-context";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // check if current page is login or signup
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white px-4 md:px-6 py-4 flex justify-between items-center relative">

      <h1 className="text-lg md:text-xl font-bold">
        Circle Blog
      </h1>

      {/* Desktop buttons - hide on mobile */}
      {!isAuthPage && (
        <div className="hidden md:flex space-x-4">
          {role === "author" && <Link href="/createBlog" className="hover:text-gray-300">Create Blog</Link>}
          <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      )}

      {/* Mobile menu button */}
      {!isAuthPage && (
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-800 rounded"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
              <div className="py-1">
                {role === "author" && (
                  <Link
                    href="/createBlog"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Blog
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    toggleFullscreen();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

    </nav>
  );
}