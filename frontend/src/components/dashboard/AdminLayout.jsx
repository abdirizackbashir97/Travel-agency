import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminTopNavbar from './AdminTopNavbar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? 'ml-44' : 'ml-16'}`}>
        <AdminTopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6 pt-4 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
