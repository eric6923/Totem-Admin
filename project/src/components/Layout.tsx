import { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import EditReview from './SidebarContents/EditReview';
import TeamMember from './SidebarContents/TeamMember';

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Layout({ darkMode, setDarkMode }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
      />

      <div className="transition-all duration-300 lg:ml-[280px]">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <main className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="p-4 lg:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-reviews" element={<EditReview />} />
              <Route path="/add-team" element={<TeamMember />} />
              {/* Add other routes here */}
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
}