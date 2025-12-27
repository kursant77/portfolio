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
      { threshold: 0.3 }
    );

    const observeSections = () => {
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });
    };

    observeSections();
    // Rescan for lazy-loaded components
    const timer = setTimeout(observeSections, 1500);
    const timer2 = setTimeout(observeSections, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      clearTimeout(timer2);
    };
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
        <div className="bg-white/10 dark:bg-[#0f172a]/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-4 md:px-10 py-4 flex justify-between items-center relative overflow-hidden group/nav">
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
          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-4 mx-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '') || (item.key === 'home' && activeSection === 'hero');
              return (
                <motion.button
                  key={item.key}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 text-[14px] xl:text-[15px] font-black transition-all duration-300 uppercase tracking-tight relative group whitespace-nowrap ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                >
                  {t(`nav.${item.key}`)}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-blue-500 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)] ${isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'
                    }`} />
                </motion.button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-gray-100/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl px-2 py-1.5 border border-white/20 dark:border-white/5 shadow-inner">
              <Globe className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent text-gray-900 dark:text-white border-none font-black text-[10px] focus:ring-0 cursor-pointer hover:text-blue-500 transition-colors py-0.5 appearance-none pr-0"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-gray-100/30 dark:bg-gray-800/30 text-gray-900 dark:text-white hover:shadow-2xl transition-all border border-white/20 dark:border-white/5 backdrop-blur-md"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
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
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 dark:border-white/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-[110]">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Asadbek<span className="text-blue-500">.</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1">
              <Globe className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">{i18n.language}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              <X className="h-7 w-7" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 px-6 py-8 flex flex-col">
          <div className="space-y-4">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.replace('#', '') || (item.key === 'home' && activeSection === 'hero');

              return (
                <motion.button
                  key={item.key}
                  variants={{
                    open: { x: 0, opacity: 1, transition: { delay: idx * 0.05 } },
                    closed: { x: 20, opacity: 0 }
                  }}
                  onClick={() => scrollToSection(item.href)}
                  className={`group w-full flex items-center justify-between p-4.5 rounded-2xl transition-all duration-300 ${isActive
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                    : 'hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center space-x-5">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={`text-lg font-black transition-colors ${isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                      {t(`nav.${item.key}`)}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-auto pt-10 pb-8 border-t border-gray-200 dark:border-white/5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-blue-600/20 mb-8"
            >
              <Mail className="h-5 w-5" />
              <span>{t('contact.title')}</span>
            </motion.button>

            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-6 text-gray-500 dark:text-gray-400">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={`text-sm font-bold uppercase transition-colors ${i18n.language === lang.code ? 'text-blue-600 underline underline-offset-4' : 'hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} Asadbek Portfolio. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
