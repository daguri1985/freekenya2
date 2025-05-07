'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UsersIcon, CoinsIcon } from 'lucide-react';

const Sidebar = ({ isOpen, className }) => {
  const router = useRouter();

  return (
    <aside
      className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-36 md:w-64 
        bg-gray-100 shadow-md p-4 border-r border-gray-200 
        transition-transform duration-300 ease-in-out z-30 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
        ${className || ''}
      `}
    >
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
      </nav>
    </aside>
  );
};

export default Sidebar;
