// components/Sidebar.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UsersIcon, CoinsIcon } from 'lucide-react';

const Sidebar = ({ isOpen, className }) => {
  const router = useRouter();
  const sidebarWidth = 'w-56 md:w-64'; // Define width for both mobile and desktop
  const translateClass = isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0';
  const navbarHeight = '4rem'; // Assuming your navbar height is 4rem

  const topOffset = '4rem'; // Try matching navbar height as top

  const sidebarClass = `fixed top-[${topOffset}] left-0 mt-0 h-[calc(100vh - ${topOffset})] bg-gray-100 shadow-md p-4 transition-transform duration-300 ease-in-out z-50 ${sidebarWidth} ${translateClass} ${className}`;

  return (
    <aside className={sidebarClass}>
      <div className="mb-8 flex items-center">
        <Link href="/admin" className="flex items-center text-lg font-semibold text-green-700">
          
          <span className="inline">Admin Panel</span>
        </Link>
      </div>
      <nav className="space-y-4">
        <Link href="/editmembers" className="flex items-center text-gray-700 hover:text-green-500">
          <UsersIcon className="mr-3 h-5 w-5" />
          <span className="inline">Manage Members</span>
        </Link>
        <Link href="/editaspirant" className="flex items-center text-gray-700 hover:text-red-500">
          <UsersIcon className="mr-3 h-5 w-5" />
          <span className="inline">Manage Aspirants</span>
        </Link>
        <Link href="/donation" className="flex items-center text-gray-700 hover:text-green-500">
          <CoinsIcon className="mr-3 h-5 w-5" />
          <span className="inline">View Donations</span>
        </Link>
        {/* Add more links as needed */}
      </nav>
      {/* You can add a footer or other elements to the sidebar here */}
    </aside>
  );
};

export default Sidebar;