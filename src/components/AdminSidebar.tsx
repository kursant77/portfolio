import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  FolderKanban,
  Briefcase,
  FileText,
  MessageSquare,
  Menu,
  X,
  Home,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
  ChevronRight,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface AdminSidebarProps {
  activeTab: 'dashboard' | 'skills' | 'projects' | 'services' | 'contact' | 'cv' | 'about';
  setActiveTab: (tab: 'dashboard' | 'skills' | 'projects' | 'services' | 'contact' | 'cv' | 'about') => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSignOut: () => void;
  counts: {
    skills: number;
    projects: number;
    services: number;
    contact: number;
    cv: number;
    about: number;
  };
}

export default function AdminSidebar({ activeTab, setActiveTab, isOpen, setIsOpen, onSignOut, counts }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const mainSection = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  const contentSection = [
    { key: 'about', label: 'About', icon: User, count: counts.about },
    { key: 'skills', label: 'Skills', icon: Code, count: counts.skills },
    { key: 'projects', label: 'Projects', icon: FolderKanban, count: counts.projects },
    { key: 'services', label: 'Services', icon: Briefcase, count: counts.services },
    { key: 'cv', label: 'CV', icon: FileText, count: counts.cv },
    { key: 'contact', label: 'Contact', icon: MessageSquare, count: counts.contact },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -280,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-50 shadow-2xl"
        style={{ width: '280px' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="p-2.5 bg-blue-600 rounded-lg shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight">Portfolio</span>
                <span className="text-xs text-gray-400 leading-tight">Control Center</span>
              </div>
            </motion.div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* ASOSIY Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                ASOSIY
              </h3>
              <div className="space-y-1">
                {mainSection.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === 'dashboard';

                  return (
                    <motion.button
                      key={item.key}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* KONTENT BOSHQARUVI Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                KONTENT BOSHQARUVI
              </h3>
              <div className="space-y-1">
                {contentSection.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;

                  return (
                    <motion.button
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab(item.key as any);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-600/20 text-blue-400'
                          }`}>
                          {item.count}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-700 space-y-2">
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="font-medium text-sm">Tema</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSignOut}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5" />
                <span className="font-medium text-sm">Chiqish</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

