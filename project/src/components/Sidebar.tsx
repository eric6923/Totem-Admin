import { Link, useNavigate } from 'react-router-dom';
import profile from './assets/profile.png';
import {
  LayoutDashboard,
  Edit,
  UserPlus,
  DollarSign,
  FolderPlus,
  Award,
  Settings,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPath: string;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, currentPath }: SidebarProps) {
  const navigate = useNavigate();

  const quickActions = [
    { icon: <Edit size={20} />, text: 'Edit Reviews', path: '/edit-reviews' },
    { icon: <UserPlus size={20} />, text: 'Add Team Member', path: '/add-team' },
    { icon: <DollarSign size={20} />, text: 'Update Pricing', path: '/pricing' },
    { icon: <FolderPlus size={20} />, text: 'Add New Project', path: '/new-project' },
    { icon: <Award size={20} />, text: 'Generate Certificate', path: '/certificate' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-all duration-300 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        w-[280px] shadow-lg z-50`}
    >
      <div className="flex items-center justify-between p-6 h-16 mt-6">
        <Link to="/dashboard" className="flex items-center">
          <img className="h-7 w-6" src={profile} alt="" />
          <span className="ml-3 text-xl font-bold text-blue-600">Totem Admin</span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-8 px-4">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex items-center w-full p-3 rounded-lg transition-colors mb-6 ${
            currentPath === '/dashboard'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3 font-medium">Dashboard</span>
        </Link>

        {/* Quick Actions Section */}
        <div className="mb-3 px-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Quick Actions
          </h2>
        </div>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                currentPath === action.path
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {action.icon}
              <span className="ml-3">{action.text}</span>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <Link
          to="/recent-activity"
          className={`flex items-center w-full p-3 rounded-lg transition-colors mt-6 ${
            currentPath === '/recent-activity'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <Award size={20} />
          <span className="ml-3">Recent Activity</span>
        </Link>

        {/* Website Preview */}
        <Link
          to="/website-preview"
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${
            currentPath === '/website-preview'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => setSidebarOpen(false)}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3">Website Preview</span>
        </Link>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => navigate('/settings')}
            className="flex items-center w-full p-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </button>
          <button 
            onClick={() => {/* Handle logout */}}
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}