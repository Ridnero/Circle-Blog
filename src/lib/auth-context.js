"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Only try to fetch user role if user is authenticated
        // Set a timeout to avoid blocking indefinitely on permission errors
        const fetchTimeout = setTimeout(() => {
          setLoading(false);
        }, 2000);

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          setRole(userDoc.data()?.role);
          console.log("User role:", userDoc.data()?.role);
          clearTimeout(fetchTimeout);
          setLoading(false);
        } catch (error) {
          console.log("Note: Could not fetch user role from Firestore");
          setRole(null);
          clearTimeout(fetchTimeout);
          setLoading(false);
        }
      } else {
        setUser(null);
        setRole(null);
        console.log("No user logged in");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && !pathname.startsWith('/auth')) {
      router.push('/auth/signup');
    }
  }, [loading, user, router, pathname]);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {!loading && (user || pathname.startsWith('/auth')) && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);