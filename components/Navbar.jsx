"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('google_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully! 🚀');
    router.push('/'); // Redirect to homepage
  };

  return (
    <nav className="bg-white shadow-md p-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="My Logo" width={250} height={250} />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link href="/aspirant" className="text-gray-700 hover:text-blue-600">Aspirant Registration</Link></li>
          <li><Link href="/" className="text-gray-700 hover:text-blue-600">Member Registration</Link></li>
          <li><Link href="/" className="text-gray-700 hover:text-blue-600">Resources</Link></li>
          <li><Link href="/Media" className="text-gray-700 hover:text-blue-600">Admin</Link></li>

          <li>
            <Link href="/Donate" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
              DONATE
            </Link>
          </li>

          {/* 🛑 Show Logout if logged in */}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <ul className="flex flex-col space-y-4">
            <li><Link href="/aspirant" className="text-gray-700 hover:text-blue-600">Aspirant Registration</Link></li>
            <li><Link href="/editmembers" className="text-gray-700 hover:text-blue-600">Members</Link></li>
            <li><Link href="/news" className="text-gray-700 hover:text-blue-600">News</Link></li>
            <li><Link href="/media" className="text-gray-700 hover:text-blue-600">Media</Link></li>
            <li><Link href="/register" className="text-gray-700 hover:text-blue-600">Register</Link></li>
            <li>
              <Link href="/donate" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 block text-center">
                DONATE
              </Link>
            </li>

            {/* 🛑 Show Logout if logged in (mobile) */}
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600 w-full"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

