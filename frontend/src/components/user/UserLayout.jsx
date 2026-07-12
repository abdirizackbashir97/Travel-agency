import React, { useState, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import UserNavbar from './UserNavbar';

const UserLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:ml-60' : 'ml-16'
        }`}
      >
        <UserNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
