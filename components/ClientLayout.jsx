'use client';

import Sidebar from './Sidebar'; // update path if needed
import { useState } from 'react';

export default function ClientLayout({ children }) {
  const [isSidebarOpen] = useState(true); // You can later add toggle logic

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <main
        className={`
          flex-1
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'md:ml-64 ml-0' : 'ml-0'}
          p-4
        `}
      >
        {children}
      </main>
    </div>
  );
}
