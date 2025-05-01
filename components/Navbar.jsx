// components/Navbar.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar({ onSidebarToggle, isSidebarOpen, isSidebarPresent }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully! 🚀');
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavToggle = () => {
    if (isSidebarPresent && onSidebarToggle) {
      onSidebarToggle(); // Toggle sidebar if present and prop exists
    } else if (!isSidebarPresent) {
      toggleMobileMenu(); // Toggle mobile menu if sidebar is not present
    } else {
      toggleMobileMenu(); // Toggle mobile menu even if sidebar present (for a combined UI if needed)
    }
  };

  return (
    <nav className="bg-white shadow-md p-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center md:justify-center justify-between"> {/* Changed justify-between to md:justify-center */}
        {/* Logo */}
        <div className="flex items-center space-x-2"> {/* Added a wrapper div for the logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="My Logo" width={250} height={250} />
          </Link>
        </div>

        {/* Mobile Menu Button - Keep it on the right on mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none absolute right-4"
          onClick={handleMobileNavToggle}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation - Hide on mobile, flex on desktop */}
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
      {!isSidebarPresent && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <ul className="flex flex-col space-y-4">
            <li><Link href="/aspirant" className="text-gray-700 hover:text-blue-600">Aspirant Registration</Link></li>
            <li><Link href="/" className="text-gray-700 hover:text-blue-600">Member Registration</Link></li>
            <li><Link href="/" className="text-gray-700 hover:text-blue-600">Resources</Link></li>
            <li><Link href="/Media" className="text-gray-700 hover:text-blue-600">Admin</Link></li>
            <li>
              <Link href="/Donate" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-green-700 block text-center">
                DONATE
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600 w-full text-center"
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