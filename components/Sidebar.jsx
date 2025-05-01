// components/Sidebar.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UsersIcon, CoinsIcon } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const sidebarClass = `fixed top-0 left-0 h-screen w-64 bg-gray-100 shadow-md p-4 transition-transform duration-300 ease-in-out ${
    isOpen ? 'translate-x-0' : '-translate-x-64'
  } md:translate-x-0`;

  return (
    <aside className={sidebarClass}>
      <div className="mb-8">
        <Link href="/admin" className="flex items-center text-lg font-semibold text-green-700">
     
          Admin Panel
        </Link>
      </div>
      <nav className="space-y-4">
        <Link href="/editmembers" className="flex items-center text-gray-700 hover:text-green-500">
          <UsersIcon className="mr-2 h-5 w-5" />
          Manage Members
        </Link>
        <Link href="/editaspirant" className="flex items-center text-gray-700 hover:text-red-500">
          <UsersIcon className="mr-2 h-5 w-5" />
          Manage Aspirants
        </Link>
        <Link href="/donation" className="flex items-center text-gray-700 hover:text-green-500">
          <CoinsIcon className="mr-2 h-5 w-5" />
          View Donations
        </Link>
        {/* Add more links as needed */}
      </nav>
      {/* You can add a footer or other elements to the sidebar here */}
    </aside>
  );
};

export default Sidebar;