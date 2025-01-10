import profile from './assets/profile.png'
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
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }: SidebarProps) {
  const quickActions = [
    { icon: <Edit size={20} />, text: 'Edit Reviews' },
    { icon: <UserPlus size={20} />, text: 'Add Team Member' },
    { icon: <DollarSign size={20} />, text: 'Update Pricing' },
    { icon: <FolderPlus size={20} />, text: 'Add New Project' },
    { icon: <Award size={20} />, text: 'Generate Certificate' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 transition-all duration-300 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        w-[280px] shadow-lg z-50`}
    >
      <div className="flex items-center justify-between p-6 h-16 mt-6">
        <div className="flex items-center">
          <img className ="h-7 w-6"src={profile} alt="" />
          <span className="ml-3 text-xl font-bold text-blue-600">Totem Admin</span>
        </div>
        {/* Close button for mobile */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="mt-8 px-4">
        {/* Dashboard */}
        <button
          onClick={() => {
            setActiveSection('dashboard');
            setSidebarOpen(false);
          }}
          className={`flex items-center w-full p-3 rounded-lg transition-colors mb-6 ${
            activeSection === 'dashboard'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3 font-medium">Dashboard</span>
        </button>

        {/* Quick Actions Section */}
        <div className="mb-3 px-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Quick Actions
          </h2>
        </div>
        <div className="space-y-1">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveSection(action.text.toLowerCase().replace(/\s+/g, '-'));
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                activeSection === action.text.toLowerCase().replace(/\s+/g, '-')
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
              }`}
            >
              {action.icon}
              <span className="ml-3">{action.text}</span>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <button
          onClick={() => {
            setActiveSection('recent-activity');
            setSidebarOpen(false);
          }}
          className={`flex items-center w-full p-3 rounded-lg transition-colors mt-6 ${
            activeSection === 'recent-activity'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
        >
          <Award size={20} />
          <span className="ml-3">Recent Activity</span>
        </button>

        {/* Website Preview */}
        <button
          onClick={() => {
            setActiveSection('website-preview');
            setSidebarOpen(false);
          }}
          className={`flex items-center w-full p-3 rounded-lg transition-colors ${
            activeSection === 'website-preview'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="ml-3">Website Preview</span>
        </button>

        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center w-full p-3 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg">
            <Settings size={20} />
            <span className="ml-3">Settings</span>
          </button>
          <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}