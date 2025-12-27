import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X, Code } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'services', href: '#services' },
    { key: 'faq', href: '#faq' },
    { key: 'cv', href: '#cv' },
    { key: 'contact', href: '#contact' }
  ];

  const languages = [
    { code: 'uz', name: 'UZ' },
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] px-4 py-6 pointer-events-none"
    >
      <div className="max-w-[95%] xl:max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] px-4 md:px-8 py-2.5 flex justify-between items-center relative overflow-hidden">
          {/* Decorative background pulse */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-400/10 dark:to-purple-400/10 -z-10 animate-pulse" />

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#hero')}
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg transform group-hover:rotate-12 transition-all duration-300">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter whitespace-nowrap">
              ASADBEK<span className="text-blue-500">.</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-4 mx-4 overflow-hidden">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-1.5 text-[10px] xl:text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 uppercase tracking-wider relative group whitespace-nowrap"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 group-hover:w-2/3 transition-all duration-300 rounded-full" />
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center bg-gray-100/50 dark:bg-gray-800/50 rounded-xl px-2">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent text-gray-700 dark:text-gray-300 border-none font-bold text-[10px] focus:ring-0 cursor-pointer hover:text-blue-500 transition-colors py-1"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-white dark:bg-gray-900">
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
              className="p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:shadow-md transition-all border border-black/5 dark:border-white/5"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 z-[110]"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { clipPath: "circle(150% at 90% 40px)", transition: { type: "spring", stiffness: 20, restDelta: 2 } },
          closed: { clipPath: "circle(0% at 90% 40px)", transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 } }
        }}
        className="fixed inset-0 bg-white dark:bg-gray-900 z-[105] lg:hidden overflow-hidden pointer-events-auto"
      >
        <div className="flex flex-col h-full justify-center items-center p-8 relative">

          <div className="space-y-6 text-center">
            {navItems.map((item, idx) => (
              <motion.button
                key={item.key}
                variants={{
                  open: { y: 0, opacity: 1, transition: { delay: 0.1 + idx * 0.05 } },
                  closed: { y: 20, opacity: 0 }
                }}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-3xl font-black text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-tighter"
              >
                {t(`nav.${item.key}`)}
              </motion.button>
            ))}
          </div>

          <motion.div
            variants={{
              open: { opacity: 1, y: 0, transition: { delay: 0.6 } },
              closed: { opacity: 0, y: 20 }
            }}
            className="mt-16 flex flex-col items-center space-y-8"
          >
            <div className="flex space-x-8">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`text-lg font-bold ${i18n.language === lang.code ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? <><Moon className="h-6 w-6" /> <span>Dark Mode</span></> : <><Sun className="h-6 w-6" /> <span>Light Mode</span></>}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}