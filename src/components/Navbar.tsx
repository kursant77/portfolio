import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X, Code, Home, User, Zap, Briefcase, Settings, MessageCircle, FileText, Mail, Globe } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');

  const navItems = [
    { key: 'home', href: '#hero', icon: Home },
    { key: 'about', href: '#about', icon: User },
    { key: 'skills', href: '#skills', icon: Zap },
    { key: 'projects', href: '#projects', icon: Briefcase },
    { key: 'services', href: '#services', icon: Settings },
    { key: 'contact', href: '#contact', icon: Mail }
  ];

  const languages = [
    { code: 'uz', name: 'UZ' },
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' }
  ];

  // Intersection Observer to track active section
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-8 pointer-events-none"
    >
      <div className="max-w-[100%] xl:max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-white/10 dark:bg-[#0f172a]/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-6 md:px-10 py-5 flex justify-between items-center relative overflow-hidden group/nav">
          {/* Decorative background pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 -z-10" />

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
          >
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-xl transform group-hover:rotate-12 transition-all duration-300">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter whitespace-nowrap">
              ASADBEK<span className="text-blue-500">.</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-2 xl:space-x-8 mx-4">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 text-[14px] font-black transition-all duration-300 uppercase tracking-[0.1em] relative group whitespace-nowrap ${activeSection === item.href.replace('#', '')
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {t(`nav.${item.key}`)}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 bg-blue-500 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.8)] ${activeSection === item.href.replace('#', '') ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                  }`} />
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
            {/* Language & Theme Controls - More Premium */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-[1.2rem] p-1 border border-white/20">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all ${i18n.language === lang.code
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              {/* Mobile Language Dropdown inside the bar */}
              <div className="flex sm:hidden items-center bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20">
                <Globe className="h-4 w-4 text-blue-500 mr-2" />
                <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-transparent text-gray-900 dark:text-white border-none font-black text-xs focus:ring-0 cursor-pointer py-0 appearance-none pr-0"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-900">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-3.5 rounded-[1.2rem] bg-white/10 dark:bg-white/5 text-gray-900 dark:text-white hover:shadow-2xl transition-all border border-white/20 backdrop-blur-md"
              >
                {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-3.5 rounded-[1.2rem] bg-blue-600 text-white shadow-lg shadow-blue-500/40 border border-blue-600/20"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Mobile Navigation Overlay */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 200 } },
          closed: { x: "100%", opacity: 0, transition: { type: "spring", damping: 25, stiffness: 200 } }
        }}
        className="fixed inset-0 bg-gray-50 dark:bg-[#0a0f18] z-[105] lg:hidden overflow-y-auto pointer-events-auto flex flex-col"
      >
        {/* Mobile Overlay Header */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-gray-200 dark:border-white/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-[110]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Asadbek<span className="text-blue-500">.</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
            >
              {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </motion.button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 px-8 py-10 flex flex-col">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between mb-10 p-4 bg-gray-100 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/5">
            <span className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{t('nav.language') || 'Language'}</span>
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${i18n.language === lang.code
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.replace('#', '');

              return (
                <motion.button
                  key={item.key}
                  variants={{
                    open: { x: 0, opacity: 1, transition: { delay: idx * 0.05 } },
                    closed: { x: 20, opacity: 0 }
                  }}
                  onClick={() => scrollToSection(item.href)}
                  className={`group w-full flex items-center justify-between p-5 rounded-[2rem] transition-all duration-300 ${isActive
                    ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/20 border border-blue-500/20'
                    : 'bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-100 dark:border-white/5'
                    }`}
                >
                  <div className="flex items-center space-x-5">
                    <div className={`p-3.5 rounded-2xl transition-all duration-300 ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:scale-110'
                      }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-lg font-black tracking-tight ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {t(`nav.${item.key}`)}
                    </span>
                  </div>
                  {isActive && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]" />}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-auto pt-10 pb-6 border-t border-gray-200 dark:border-white/5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center space-x-3 shadow-2xl shadow-blue-600/30 mb-10"
            >
              <Mail className="h-6 w-6" />
              <span>{t('contact.title')}</span>
            </motion.button>

            <div className="text-center">
              <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-black">
                © {new Date().getFullYear()} ASADBEK JUMANAZAROV
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}