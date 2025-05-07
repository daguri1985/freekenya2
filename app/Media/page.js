'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { UsersIcon as UserIcon, UserPlusIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Media = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [memberCount, setMemberCount] = useState(150);
  const [aspirantCount, setAspirantCount] = useState(45);
  const [newMembersData, setNewMembersData] = useState([
    { day: 'Mon', count: 10 }, { day: 'Tue', count: 15 }, { day: 'Wed', count: 12 },
    { day: 'Thu', count: 18 }, { day: 'Fri', count: 20 }, { day: 'Sat', count: 8 }, { day: 'Sun', count: 13 },
  ]);
  const [newAspirantsData, setNewAspirantsData] = useState([
    { day: 'Mon', count: 3 }, { day: 'Tue', count: 5 }, { day: 'Wed', count: 2 },
    { day: 'Thu', count: 7 }, { day: 'Fri', count: 6 }, { day: 'Sat', count: 1 }, { day: 'Sun', count: 4 },
  ]);

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

  const handleManageMembers = () => router.push('/editmembers');
  const handleManageAspirants = () => router.push('/editaspirant');
  const handleViewDonations = () => router.push('/donation');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidthDesktop = 16;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar onSidebarToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} isSidebarPresent={true} />
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar */}
        <Sidebar
  isOpen={isSidebarOpen}
  className={`fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out z-30 w-36 md:w-[${sidebarWidthDesktop}rem] ${
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
  }`}
/>
        {/* Main content area */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ml-0 md:ml-[${sidebarWidthDesktop}rem]`}>

          <div className="p-4 md:p-8">
            <div className="mb-4 md:mb-8">
              <h1 className="text-xl font-bold text-green-700 md:text-3xl">Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {/* Existing Cards */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-2 text-green-500 md:text-xl md:mb-4 flex items-center"><UserIcon className="mr-2 h-5 w-5" /> Manage Members</h2>
                <p className="text-gray-700 mb-2 md:mb-4 text-sm">Edit, delete, or update member information.</p>
                <Tippy content="Click here to manage the members of the platform." theme={{ ...customTheme, name: 'custom' }}>
                  <button
                    onClick={handleManageMembers}
                    className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  >
                    Edit Members
                  </button>
                </Tippy>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-2 text-red-500 md:text-xl md:mb-4 flex items-center"><UserIcon className="mr-2 h-5 w-5" /> Manage Aspirants</h2>
                <p className="text-gray-700 mb-2 md:mb-4 text-sm">Edit or view information about aspirants.</p>
                <Tippy content="This button allows you to edit and view aspirant details." theme={{ ...customTheme, name: 'custom' }}>
                  <button
                    onClick={handleManageAspirants}
                    className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  >
                    Manage Aspirants
                  </button>
                </Tippy>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-2 text-green-500 md:text-xl md:mb-4 flex items-center"><UserIcon className="mr-2 h-5 w-5" /> View Donations</h2>
                <p className="text-gray-700 mb-2 md:mb-4 text-sm">Track donations and donor activities.</p>
                <Tippy content="View and track all the donations made to the platform here." theme={{ ...customTheme, name: 'custom' }}>
                  <button
                    onClick={handleViewDonations}
                    className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  >
                    View Donations
                  </button>
                </Tippy>
              </div>

              {/* New Cards */}
              <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex items-center">
                <div className="mr-4">
                  <UserIcon className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-blue-700">{memberCount}</h2>
                  <p className="text-gray-600 text-sm">Total Members</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex items-center">
                <div className="mr-4">
                  <UserIcon className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-orange-700">{aspirantCount}</h2>
                  <p className="text-gray-600 text-sm">Total Aspirants</p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-2 text-purple-500 md:text-xl md:mb-4 flex items-center"><UserPlusIcon className="mr-2 h-5 w-5" /> New Members (Last 7 Days)</h2>
                <LineChart width={250} height={100} data={newMembersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-2 text-teal-500 md:text-xl md:mb-4 flex items-center"><UserPlusIcon className="mr-2 h-5 w-5" /> New Aspirants (Last 7 Days)</h2>
                <LineChart width={250} height={100} data={newAspirantsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Media;