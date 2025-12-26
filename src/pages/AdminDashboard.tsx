import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import AdminSidebar from '../components/AdminSidebar';
import {
  LogOut,
  Settings,
  Code,
  FolderKanban,
  Briefcase,
  FileText,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Moon,
  Sun,
  Menu,
  Bell,
  Search,
  Upload,
  LayoutDashboard,
  Download,
  Eye,
  User
} from 'lucide-react';
import { Skill, Project, Service, ContactInfo, CVInfo, AboutSection } from '../types/database';
import AdminModal from '../components/AdminModal';
import { uploadImage, getImagePreview } from '../utils/imageUpload';
import { getColorByIcon } from '../utils/colorGenerator';
import { cache } from '../utils/cache';

function AdminDashboardContent() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skills' | 'projects' | 'services' | 'contact' | 'cv' | 'about'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Data states
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null);
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();

    // Desktop da sidebar har doim ochiq
    const checkSidebar = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    checkSidebar();
    window.addEventListener('resize', checkSidebar);
    return () => window.removeEventListener('resize', checkSidebar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Parallel fetching for better performance
      await Promise.all([
        fetchSkills(),
        fetchProjects(),
        fetchServices(),
        fetchContactInfo(),
        fetchCVInfo(),
        fetchAboutData(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: false });
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching skills:', error);
        }
      } else if (data) {
        setSkills(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching skills:', error);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching projects:', error);
        }
      } else if (data) {
        setProjects(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching projects:', error);
      }
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (error) {
        if (import.meta.env.DEV) {
          console.error('Error fetching services:', error);
        }
      } else if (data) {
        setServices(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching services:', error);
      }
    }
  };

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase.from('contact_info').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        if (import.meta.env.DEV) {
          console.error('Error fetching contact info:', error);
        }
      } else if (data) {
        setContactInfo(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching contact info:', error);
      }
    }
  };

  const fetchCVInfo = async () => {
    try {
      const { data, error } = await supabase.from('cv_info').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        if (import.meta.env.DEV) {
          console.error('Error fetching CV info:', error);
        }
      } else if (data) {
        setCvInfo(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching CV info:', error);
      }
    }
  };

  const fetchAboutData = async () => {
    try {
      const { data, error } = await supabase.from('about_section').select('*').limit(1).single();
      if (error && error.code !== 'PGRST116') {
        if (import.meta.env.DEV) {
          console.error('Error fetching about data:', error);
        }
      } else if (data) {
        setAboutData(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error fetching about data:', error);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleDelete = async (table: string, id: string) => {
    const confirmed = window.confirm('O\'chirishni tasdiqlaysizmi?');
    if (!confirmed) return;

    const deletePromise = (async () => {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    })();

    toast.promise(deletePromise, {
      loading: 'O\'chirilmoqda...',
      success: () => {
        cache.clear(table);
        fetchAllData();
        return 'Muvaffaqiyatli o\'chirildi!';
      },
      error: (error) => `O'chirishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onSignOut={handleSignOut}
        counts={{
          skills: skills.length,
          projects: projects.length,
          services: services.length,
          contact: contactInfo ? 1 : 0,
          cv: cvInfo ? 1 : 0,
          about: aboutData ? 1 : 0,
        }}
      />

      {/* Main Content */}
      <div className="transition-all duration-300 lg:ml-[280px]">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </motion.button>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Portfolio Admin
                  </h1>
                  <p className="text-sm text-gray-400">Monitoring va boshqaruv</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-700">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{user?.email}</p>
                    <p className="text-xs text-gray-400">Admin</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen">
          {activeTab === 'dashboard' ? (
            <DashboardView
              skills={skills}
              projects={projects}
              services={services}
              contactInfo={contactInfo}
              cvInfo={cvInfo}
              aboutData={aboutData}
              onNavigate={(tab) => setActiveTab(tab)}
            />
          ) : (
            <>
              {activeTab === 'skills' && (
                <SkillsTab
                  skills={skills}
                  onRefresh={fetchSkills}
                  onDelete={(id) => handleDelete('skills', id)}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectsTab
                  projects={projects}
                  onRefresh={fetchProjects}
                  onDelete={(id) => handleDelete('projects', id)}
                />
              )}
              {activeTab === 'services' && (
                <ServicesTab
                  services={services}
                  onRefresh={fetchServices}
                  onDelete={(id) => handleDelete('services', id)}
                />
              )}
              {activeTab === 'contact' && (
                <ContactTab
                  contactInfo={contactInfo}
                  onRefresh={fetchContactInfo}
                />
              )}
              {activeTab === 'cv' && (
                <CVTab
                  cvInfo={cvInfo}
                  onRefresh={fetchCVInfo}
                  skillsCount={skills.length}
                  projectsCount={projects.length}
                />
              )}
              {activeTab === 'about' && (
                <AboutTab
                  aboutData={aboutData}
                  onRefresh={fetchAboutData}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// Dashboard View Component
function DashboardView({
  skills,
  projects,
  services,
  contactInfo,
  cvInfo,
  aboutData,
  onNavigate,
}: {
  skills: Skill[];
  projects: Project[];
  services: Service[];
  contactInfo: ContactInfo | null;
  cvInfo: CVInfo | null;
  aboutData: AboutSection | null;
  onNavigate: (tab: 'skills' | 'projects' | 'services' | 'contact' | 'cv' | 'about') => void;
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400 text-lg">Umumiy statistikalar va monitoring</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('skills')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Skills</p>
            <p className="text-2xl font-bold text-white mb-2">{skills.length}</p>
            <p className="text-xs text-gray-500">Total skills count</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-purple-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('projects')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Projects</p>
            <p className="text-2xl font-bold text-white mb-2">{projects.length}</p>
            <p className="text-xs text-gray-500">Total projects</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-green-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('services')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Services</p>
            <p className="text-2xl font-bold text-white mb-2">{services.length}</p>
            <p className="text-xs text-gray-500">Total services</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-orange-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('contact')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Contact</p>
            <p className="text-2xl font-bold text-white mb-2">{contactInfo ? '1' : '0'}</p>
            <p className="text-xs text-gray-500">Contact info</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-cyan-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('cv')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">CV</p>
            <p className="text-2xl font-bold text-white mb-2">{cvInfo ? '1' : '0'}</p>
            <p className="text-xs text-gray-500">CV information</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
          onClick={() => onNavigate('about')}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">About</p>
            <p className="text-2xl font-bold text-white mb-2">{aboutData ? '1' : '0'}</p>
            <p className="text-xs text-gray-500">About information</p>
          </div>
        </motion.div>
      </div>

      {/* Additional Stats or Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Tezkor Amallar</h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('about')}
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="text-white">About boshqaruvi</span>
              <span className="text-gray-400">{aboutData ? '1' : '0'} ta</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('skills')}
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="text-white">Skills boshqaruvi</span>
              <span className="text-gray-400">{skills.length} ta</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('projects')}
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="text-white">Projects boshqaruvi</span>
              <span className="text-gray-400">{projects.length} ta</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('services')}
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-between"
            >
              <span className="text-white">Services boshqaruvi</span>
              <span className="text-gray-400">{services.length} ta</span>
            </motion.button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Ma'lumotlar Holati</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Contact Info</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${contactInfo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {contactInfo ? 'Mavjud' : 'Yo\'q'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">CV Fayl</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cvInfo?.cv_file_url ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {cvInfo?.cv_file_url ? 'Yuklangan' : 'Yuklanmagan'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-gray-300">About Matni</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${aboutData ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {aboutData ? 'Mavjud' : 'Yo\'q'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Skills Tab Component
function SkillsTab({ skills, onRefresh, onDelete }: { skills: Skill[]; onRefresh: () => void; onDelete: (id: string) => void }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({ name: '', level: 0, icon: '', color: '' });

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData(skill);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.icon) {
      toast.error('Iltimos, Name va Icon maydonlarini to\'ldiring!');
      return;
    }

    try {
      // Avtomatik rang tanlash
      const autoColor = getColorByIcon(formData.icon);
      const dataToSave = { ...formData, color: autoColor };

      if (editingId) {
        const updatePromise = (async () => {
          const { error } = await supabase.from('skills').update(dataToSave).eq('id', editingId);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('skills');
            setShowAddModal(false);
            setEditingId(null);
            setFormData({ name: '', level: 0, icon: '', color: '' });
            onRefresh();
            return 'Skill muvaffaqiyatli yangilandi!';
          },
          error: (error) => `Skill yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase.from('skills').insert([dataToSave]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('skills');
            setShowAddModal(false);
            setFormData({ name: '', level: 0, icon: '', color: '' });
            onRefresh();
            return 'Skill muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `Skill qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error:', error);
      }
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setEditingId(null);
    setFormData({ name: '', level: 0, icon: '', color: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Skills Boshqaruvi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowAddModal(true);
            setEditingId(null);
            setFormData({ name: '', level: 0, icon: '', color: '' });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Qo'shish
        </motion.button>
      </div>

      <AdminModal
        isOpen={showAddModal}
        onClose={handleCancel}
        title={editingId ? 'Skill Tahrirlash' : 'Yangi Skill Qo\'shish'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            type="number"
            placeholder="Level (0-100)"
            min="0"
            max="100"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })}
            className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <input
            type="text"
            placeholder="Icon (lucide icon name, e.g., Code, Globe)"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {formData.icon && (
            <div className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-400">
              <p className="text-sm">Rang avtomatik tanlanadi: <span className="text-blue-400">{getColorByIcon(formData.icon)}</span></p>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
          >
            Bekor qilish
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all"
          >
            {editingId ? 'Yangilash' : 'Qo\'shish'}
          </motion.button>
        </div>
      </AdminModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Hozircha skills yo'q</p>
          </div>
        ) : (
          skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-5 bg-gray-700 rounded-lg border border-gray-600 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-lg">{skill.name}</h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(skill.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Level:</span>
                  <span className="text-sm font-semibold text-white">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 truncate">Icon: {skill.icon}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({ projects, onRefresh, onDelete }: { projects: Project[]; onRefresh: () => void; onDelete: (id: string) => void }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    image: '', demo_url: '', github_url: '', title_en: '', title_uz: '', title_ru: '',
    description_en: '', description_uz: '', description_ru: ''
  });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const preview = await getImagePreview(file);
    setImagePreview(preview);

    // Upload image
    setUploading(true);
    const imageUrl = await uploadImage(file, 'projects');
    if (imageUrl) {
      setFormData({ ...formData, image: imageUrl });
    }
    setUploading(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData(project);
    setImagePreview(project.image);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.title_uz || !formData.image) {
      toast.error('Iltimos, Title (UZ) va Image maydonlarini to\'ldiring!');
      return;
    }

    try {
      if (editingId) {
        const updatePromise = (async () => {
          const { error } = await supabase.from('projects').update(formData).eq('id', editingId);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('projects');
            setShowAddModal(false);
            setEditingId(null);
            setImagePreview(null);
            setFormData({ image: '', demo_url: '', github_url: '', title_en: '', title_uz: '', title_ru: '', description_en: '', description_uz: '', description_ru: '' });
            onRefresh();
            return 'Project muvaffaqiyatli yangilandi!';
          },
          error: (error) => `Project yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase.from('projects').insert([formData]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('projects');
            setShowAddModal(false);
            setImagePreview(null);
            setFormData({ image: '', demo_url: '', github_url: '', title_en: '', title_uz: '', title_ru: '', description_en: '', description_uz: '', description_ru: '' });
            onRefresh();
            return 'Project muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `Project qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error:', error);
      }
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setEditingId(null);
    setImagePreview(null);
    setFormData({ image: '', demo_url: '', github_url: '', title_en: '', title_uz: '', title_ru: '', description_en: '', description_uz: '', description_ru: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Projects Boshqaruvi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowAddModal(true);
            setEditingId(null);
            setImagePreview(null);
            setFormData({ image: '', demo_url: '', github_url: '', title_en: '', title_uz: '', title_ru: '', description_en: '', description_uz: '', description_ru: '' });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Qo'shish
        </motion.button>
      </div>

      <AdminModal
        isOpen={showAddModal}
        onClose={handleCancel}
        title={editingId ? 'Project Tahrirlash' : 'Yangi Project Qo\'shish'}
      >
        <div className="space-y-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Rasm</label>
            <div className="flex items-center space-x-4">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-600" />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: '' });
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-800">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-400 text-center px-2">Rasm yuklash</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
              {uploading && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm">Yuklanmoqda...</span>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Yoki URL kiriting"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImagePreview(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.demo_url}
                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title (EN)</label>
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title (UZ)</label>
              <input
                type="text"
                placeholder="Loyiha nomi"
                value={formData.title_uz}
                onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title (RU)</label>
              <input
                type="text"
                placeholder="Название проекта"
                value={formData.title_ru}
                onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description (EN)</label>
              <textarea
                placeholder="Project description..."
                value={formData.description_en}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description (UZ)</label>
              <textarea
                placeholder="Loyiha tavsifi..."
                value={formData.description_uz}
                onChange={(e) => setFormData({ ...formData, description_uz: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description (RU)</label>
              <textarea
                placeholder="Описание проекта..."
                value={formData.description_ru}
                onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
            >
              Bekor qilish
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={uploading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all disabled:opacity-50"
            >
              {editingId ? 'Yangilash' : 'Qo\'shish'}
            </motion.button>
          </div>
        </div>
      </AdminModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Hozircha projects yo'q</p>
          </div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-5 bg-gray-700 rounded-lg border border-gray-600 shadow-md hover:shadow-xl hover:border-purple-500 transition-all duration-300"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title_uz}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-lg">{project.title_uz}</h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(project.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description_uz}</p>
              <div className="flex space-x-3 text-xs">
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Demo
                </a>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Services Tab Component
function ServicesTab({ services, onRefresh, onDelete }: { services: Service[]; onRefresh: () => void; onDelete: (id: string) => void }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({
    key: '', icon: '', color: '', title_en: '', title_uz: '', title_ru: ''
  });

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.key || !formData.icon || !formData.title_uz) {
      toast.error('Iltimos, Key, Icon va Title (UZ) maydonlarini to\'ldiring!');
      return;
    }

    try {
      // Avtomatik rang tanlash
      const autoColor = getColorByIcon(formData.icon || 'Code');
      const dataToSave = { ...formData, color: autoColor };

      if (editingId) {
        const updatePromise = (async () => {
          const { error } = await supabase.from('services').update(dataToSave).eq('id', editingId);
          if (error) throw error;
        })();
        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('services');
            setShowAddModal(false);
            setEditingId(null);
            setFormData({ key: '', icon: '', color: '', title_en: '', title_uz: '', title_ru: '' });
            onRefresh();
            return 'Service muvaffaqiyatli yangilandi!';
          },
          error: (error) => `Service yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase.from('services').insert([dataToSave]);
          if (error) throw error;
        })();
        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('services');
            setShowAddModal(false);
            setFormData({ key: '', icon: '', color: '', title_en: '', title_uz: '', title_ru: '' });
            onRefresh();
            return 'Service muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `Service qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Unexpected error:', error);
      }
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setEditingId(null);
    setFormData({ key: '', icon: '', color: '', title_en: '', title_uz: '', title_ru: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Services Boshqaruvi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowAddModal(true);
            setEditingId(null);
            setFormData({ key: '', icon: '', color: '', title_en: '', title_uz: '', title_ru: '' });
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Qo'shish
        </motion.button>
      </div>

      <AdminModal
        isOpen={showAddModal}
        onClose={handleCancel}
        title={editingId ? 'Service Tahrirlash' : 'Yangi Service Qo\'shish'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Key</label>
            <input
              type="text"
              placeholder="service_key"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (lucide icon name)</label>
            <input
              type="text"
              placeholder="Monitor, Code, etc."
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {formData.icon && (
            <div className="px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-400">
              <p className="text-sm">Rang avtomatik tanlanadi: <span className="text-blue-400">{getColorByIcon(formData.icon)}</span></p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title (EN)</label>
            <input
              type="text"
              placeholder="Service Title"
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title (UZ)</label>
            <input
              type="text"
              placeholder="Xizmat nomi"
              value={formData.title_uz}
              onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title (RU)</label>
            <input
              type="text"
              placeholder="Название услуги"
              value={formData.title_ru}
              onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
          >
            Bekor qilish
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all"
          >
            {editingId ? 'Yangilash' : 'Qo\'shish'}
          </motion.button>
        </div>
      </AdminModal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400">Hozircha services yo'q</p>
          </div>
        ) : (
          services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-5 bg-gray-700 rounded-lg border border-gray-600 shadow-md hover:shadow-xl hover:border-green-500 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-lg">{service.title_uz}</h3>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(service)}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(service.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Key: <span className="text-gray-300">{service.key}</span></p>
                <p className="text-xs text-gray-400">Icon: <span className="text-gray-300">{service.icon}</span></p>
                <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${service.color}`} style={{ width: '100%' }} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Contact Tab Component
function ContactTab({ contactInfo, onRefresh }: { contactInfo: ContactInfo | null; onRefresh: () => void }) {
  const [formData, setFormData] = useState<Partial<ContactInfo>>({
    phone: '', email: '', github_url: '', telegram_url: '', linkedin_url: ''
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (contactInfo) {
      setFormData(contactInfo);
    }
  }, [contactInfo]);

  const handleSave = async () => {
    try {
      if (contactInfo) {
        const updatePromise = (async () => {
          const { error } = await supabase.from('contact_info').update(formData).eq('id', contactInfo.id);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('contact_info');
            setEditing(false);
            onRefresh();
            return 'Contact ma\'lumotlari muvaffaqiyatli yangilandi!';
          },
          error: (error) => `Contact ma'lumotlarini yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase.from('contact_info').insert([formData]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('contact_info');
            setEditing(false);
            onRefresh();
            return 'Contact ma\'lumotlari muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `Contact ma'lumotlarini qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Contact Information Boshqaruvi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditing(!editing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          {editing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {editing ? 'Bekor qilish' : 'Tahrirlash'}
        </motion.button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github_url || ''}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Telegram URL</label>
          <input
            type="url"
            value={formData.telegram_url || ''}
            onChange={(e) => setFormData({ ...formData, telegram_url: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin_url || ''}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            disabled={!editing}
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>
        {editing && (
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Saqlash
          </button>
        )}
      </div>
    </div>
  );
}

// CV Tab Component
function CVTab({
  cvInfo,
  onRefresh,
  skillsCount,
  projectsCount
}: {
  cvInfo: CVInfo | null;
  onRefresh: () => void;
  skillsCount: number;
  projectsCount: number;
}) {
  const [uploading, setUploading] = useState(false);
  const [cvFileUrl, setCvFileUrl] = useState<string>(cvInfo?.cv_file_url || '');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<CVInfo>>({
    experience: cvInfo?.experience || '',
    name: cvInfo?.name || '',
    title: cvInfo?.title || '',
  });

  useEffect(() => {
    if (cvInfo) {
      setCvFileUrl(cvInfo.cv_file_url || '');
      setFormData({
        experience: cvInfo.experience || '',
        name: cvInfo.name || '',
        title: cvInfo.title || '',
      });
    }
  }, [cvInfo]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error('Faqat PDF fayl yuklash mumkin!');
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('Fayl hajmi 10MB dan katta bo\'lmasligi kerak!');
      return;
    }

    setUploading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `cv-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `cv/${fileName}`;

      // Try to upload with upsert in case file exists
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Allow overwriting if file exists
        });

      if (uploadError) {
        if (import.meta.env.DEV) {
          console.error('Upload error:', uploadError);
        }
        let errorMessage = 'Fayl yuklashda xatolik yuz berdi!';

        if (uploadError.message.includes('Bucket not found')) {
          errorMessage = 'Storage bucket topilmadi! Iltimos, Supabase da "portfolio-images" bucket yaratilganligini tekshiring.';
        } else if (uploadError.message.includes('new row violates row-level security')) {
          errorMessage = 'Ruxsat yo\'q! Iltimos, Supabase Storage policies ni tekshiring.';
        } else if (uploadError.message) {
          errorMessage = `Fayl yuklashda xatolik: ${uploadError.message}`;
        }

        toast.error(errorMessage);
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        toast.error('Fayl URL olishda xatolik!');
        setUploading(false);
        return;
      }

      // Save to database with auto-calculated counts
      const dataToSave = {
        cv_file_url: publicUrl,
        projects_count: projectsCount.toString(),
        skills_count: skillsCount.toString(),
        // Include other required fields if they exist
        name: formData.name || cvInfo?.name || '',
        title: formData.title || cvInfo?.title || '',
        experience: formData.experience || cvInfo?.experience || '',
      };

      if (cvInfo) {
        const updatePromise = (async () => {
          const { error } = await supabase
            .from('cv_info')
            .update(dataToSave)
            .eq('id', cvInfo.id);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Saqlanmoqda...',
          success: () => {
            cache.clear('cv_info');
            setCvFileUrl(publicUrl);
            onRefresh();
            return 'CV fayl muvaffaqiyatli yuklandi!';
          },
          error: (error) => `Ma'lumotlar bazasiga saqlashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase
            .from('cv_info')
            .insert([dataToSave]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Saqlanmoqda...',
          success: () => {
            cache.clear('cv_info');
            setCvFileUrl(publicUrl);
            onRefresh();
            return 'CV fayl muvaffaqiyatli yuklandi!';
          },
          error: (error) => `Ma'lumotlar bazasiga saqlashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveInfo = async () => {
    try {
      // CV fayl URL ni tekshirish - agar bo'sh bo'lsa, mavjud URL dan foydalanish
      const fileUrl = cvFileUrl || cvInfo?.cv_file_url || '';

      if (!fileUrl && !cvInfo) {
        toast.error('Iltimos, avval CV faylni yuklang!');
        return;
      }

      // Auto-calculate projects and skills count
      const dataToSave = {
        ...formData,
        cv_file_url: fileUrl, // CV fayl URL ni qo'shish
        projects_count: projectsCount.toString(),
        skills_count: skillsCount.toString(),
      };

      if (cvInfo) {
        const updatePromise = (async () => {
          const { error } = await supabase
            .from('cv_info')
            .update(dataToSave)
            .eq('id', cvInfo.id);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('cv_info');
            setEditing(false);
            onRefresh();
            return 'CV ma\'lumotlari muvaffaqiyatli yangilandi!';
          },
          error: (error) => `CV ma'lumotlarini yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase
            .from('cv_info')
            .insert([dataToSave]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('cv_info');
            setEditing(false);
            onRefresh();
            return 'CV ma\'lumotlari muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `CV ma'lumotlarini qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error('Xatolik yuz berdi: ' + (error?.message || 'Noma\'lum xatolik'));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">CV Ma'lumotlari Boshqaruvi</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditing(!editing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          {editing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {editing ? 'Bekor qilish' : 'Tahrirlash'}
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* CV Information Section */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">CV Ma'lumotlari</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ism</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Asadbek Jumanazarov"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lavozim</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tajriba</label>
              <input
                type="text"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2+ Years"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Projects</p>
                <p className="text-2xl font-bold text-white">{projectsCount}</p>
                <p className="text-xs text-gray-500 mt-1">Avtomatik hisoblanadi</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Skills</p>
                <p className="text-2xl font-bold text-white">{skillsCount}</p>
                <p className="text-xs text-gray-500 mt-1">Avtomatik hisoblanadi</p>
              </div>
            </div>

            {editing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveInfo}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg"
              >
                <Save className="h-4 w-4 mr-2" />
                Saqlash
              </motion.button>
            )}
          </div>
        </div>
        {/* File Upload Section */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">CV Fayl Yuklash</h3>

          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-700">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Fayl yuklash uchun bosing</span> yoki bu yerga sudrab tashlang
                </p>
                <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>

            {uploading && (
              <div className="flex items-center justify-center space-x-2 text-blue-400">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span>Fayl yuklanmoqda...</span>
              </div>
            )}
          </div>
        </div>

        {/* Current CV File Display */}
        {cvFileUrl && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Yuklangan CV Fayl</h3>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-white font-medium">CV Fayl</p>
                  <p className="text-sm text-gray-400">PDF format</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.a
                  href={cvFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ko'rish</span>
                </motion.a>
                <motion.a
                  href={cvFileUrl}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Yuklab olish</span>
                </motion.a>
              </div>
            </div>
          </div>
        )}

        {!cvFileUrl && !uploading && (
          <div className="text-center py-8 text-gray-400">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <p>Hozircha CV fayl yuklanmagan</p>
          </div>
        )}
      </div>
    </div>
  );
}

// About Tab Component
function AboutTab({ aboutData, onRefresh }: { aboutData: AboutSection | null; onRefresh: () => void }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutSection>>(aboutData || {});

  useEffect(() => {
    if (aboutData) setFormData(aboutData);
  }, [aboutData]);

  const handleSave = async () => {
    try {
      if (aboutData) {
        const updatePromise = (async () => {
          const { error } = await supabase.from('about_section').update(formData).eq('id', aboutData.id);
          if (error) throw error;
        })();

        toast.promise(updatePromise, {
          loading: 'Yangilanmoqda...',
          success: () => {
            cache.clear('about_section');
            setEditing(false);
            onRefresh();
            return 'About ma\'lumotlari muvaffaqiyatli yangilandi!';
          },
          error: (error) => `Yangilashda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      } else {
        const insertPromise = (async () => {
          const { error } = await supabase.from('about_section').insert([formData]);
          if (error) throw error;
        })();

        toast.promise(insertPromise, {
          loading: 'Qo\'shilmoqda...',
          success: () => {
            cache.clear('about_section');
            setEditing(false);
            onRefresh();
            return 'About ma\'lumotlari muvaffaqiyatli qo\'shildi!';
          },
          error: (error) => `Qo'shishda xatolik: ${error?.message || 'Noma\'lum xatolik'}`,
        });
      }
    } catch (error: any) {
      toast.error('Xatolik yuz berdi: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">About Boshqaruvi</h2>
          <p className="text-sm text-gray-400 mt-1 italic">Bu bo'lim AI qidiruvlari uchun asosiy manba hisoblanadi</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setEditing(!editing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg"
        >
          {editing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
          {editing ? 'Bekor qilish' : 'Tahrirlash'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6 text-yellow-500">
            <Bell className="h-5 w-5" />
            <p className="text-sm font-medium italic">
              AI (ChatGPT, Gemini) "Asadbek Jumanazarov kim?" deb so'ralganda bu yerdagi ma'lumotlarni o'qiydi. Aniq va lo'nda yozing.
            </p>
          </div>

          <div className="space-y-6">
            {/* Title & Content - UZ */}
            <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-blue-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                UZBEKCHA (Asosiy)
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Sarlavha (Title)</label>
                <input
                  type="text"
                  value={formData.title_uz || ''}
                  onChange={(e) => setFormData({ ...formData, title_uz: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Asosiy matn (Description)</label>
                <textarea
                  value={formData.content_uz || ''}
                  onChange={(e) => setFormData({ ...formData, content_uz: e.target.value })}
                  disabled={!editing}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white resize-none"
                />
              </div>
            </div>

            {/* Title & Content - EN */}
            <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-purple-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                ENGLISH (For Global Search)
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title_en || ''}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Description</label>
                <textarea
                  value={formData.content_en || ''}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  disabled={!editing}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white resize-none"
                />
              </div>
            </div>

            {/* Title & Content - RU */}
            <div className="space-y-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-red-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                RUSSIAN
              </h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Заголовок</label>
                <input
                  type="text"
                  value={formData.title_ru || ''}
                  onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                  disabled={!editing}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Описание</label>
                <textarea
                  value={formData.content_ru || ''}
                  onChange={(e) => setFormData({ ...formData, content_ru: e.target.value })}
                  disabled={!editing}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white resize-none"
                />
              </div>
            </div>

            {editing && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-xl font-bold"
              >
                <Save className="h-5 w-5 mr-2" />
                BARCHA O'ZGARISHLARNI SAQLASH
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ThemeProvider>
      <AdminDashboardContent />
    </ThemeProvider>
  );
}
