// client/src/components/common/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoBanner } from './DemoBanner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1-Click Demo switcher for live presentation */}
      <DemoBanner />

      {/* Top Header */}
      <Navbar />

      {/* Main Workspace Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
