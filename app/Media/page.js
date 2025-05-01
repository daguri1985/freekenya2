'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import default Tippy styles

const Media = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    setIsLoggedIn(!!token);
  }, []);

  const customTheme = {
    '--tippy-bg': 'bg-black',
    '--tippy-fg': 'text-white',
    '--tippy-border': 'border border-gray-700',
    '--tippy-arrow-bg': 'bg-black',
    '--tippy-arrow-border': 'border-gray-700',
  };

  // Functions to handle button clicks (redirect or do action)
  const handleManageMembers = () => router.push('/editmembers');
  //const handleUploadMedia = () => router.push('/admin/upload-media');
  //const handleViewReports = () => router.push('/admin/reports');
  const handleManageAspirants = () => router.push('/editaspirant');
  const handleViewDonations = () => router.push('/donation');

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-green-600">Please login to access Media Admin Panel</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            localStorage.setItem('google_token', credentialResponse.credential);
            setIsLoggedIn(true);
          }}
          onError={() => console.log("Login Failed")}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Members */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Manage Members</h2>
            <p className="text-gray-700 mb-4">Edit, delete, or update member information.</p>
            <Tippy content="Click here to manage the members of the platform." theme={{ ...customTheme, name: 'custom' }}>
              <button
                onClick={handleManageMembers}
                className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Members
              </button>
            </Tippy>
          </div>

          {/* Manage Aspirants */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Manage Aspirants</h2>
            <p className="text-gray-700 mb-4">Edit or view information about aspirants.</p>
            <Tippy content="This button allows you to edit and view aspirant details." theme={{ ...customTheme, name: 'custom' }}>
              <button
                onClick={handleManageAspirants}
                className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage Aspirants
              </button>
            </Tippy>
          </div>

          {/* View Donations */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">View Donations</h2>
            <p className="text-gray-700 mb-4">Track donations and donor activities.</p>
            <Tippy content="View and track all the donations made to the platform here." theme={{ ...customTheme, name: 'custom' }}>
              <button
                onClick={handleViewDonations}
                className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                View Donations
              </button>
            </Tippy>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Media;