import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/component/Navbar";

export const metadata = {
  title: "Circle Blog",
  description: "A space for Readers and Authors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto py-10 px-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}