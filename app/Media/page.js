'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';

const Media = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  // Functions to handle button clicks (redirect or do action)
  const handleManageMembers = () => router.push('/editmembers');
  const handleUploadMedia = () => router.push('/admin/upload-media');
  const handleViewReports = () => router.push('/admin/reports');
  const handleManageAspirants = () => router.push('/editaspirant');
  const handleViewDonations = () => router.push('/admin/donations');

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
          <h1 className="text-3xl font-bold text-green-700">Media Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Members */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Manage Members</h2>
            <p className="text-gray-700 mb-4">Edit, delete, or update member information.</p>
            <button
              onClick={handleManageMembers}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Members
            </button>
          </div>

          {/* Upload Media */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Upload Media</h2>
            <p className="text-gray-700 mb-4">Upload new training videos or content.</p>
            <button
              onClick={handleUploadMedia}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Video
            </button>
          </div>

          {/* Reports */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Reports & Analytics</h2>
            <p className="text-gray-700 mb-4">View reports on member activity and media performance.</p>
            <button
              onClick={handleViewReports}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              View Reports
            </button>
          </div>

          {/* Manage Aspirants */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Manage Aspirants</h2>
            <p className="text-gray-700 mb-4">Edit or view information about aspirants.</p>
            <button
              onClick={handleManageAspirants}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Manage Aspirants
            </button>
          </div>

          {/* View Donations */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-500">View Donations</h2>
            <p className="text-gray-700 mb-4">Track donations and donor activities.</p>
            <button
              onClick={handleViewDonations}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              View Donations
            </button>
          </div>

          {/* Video Library */}
          <div className="bg-white shadow-md rounded-lg p-6 col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-green-500">Video Library</h2>
            <VideoPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Media;
