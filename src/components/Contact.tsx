import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { Mail, Phone, Send, Github, MessageSquare, Linkedin } from 'lucide-react';
import { useContactInfo } from '../hooks/useSupabaseData';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitPromise = Promise.resolve(supabase.from('contact_messages').insert([formData]));

    toast.promise(submitPromise, {
      loading: 'Yuborilmoqda...',
      success: (result: any) => {
        if (result.error) {
          throw new Error(result.error.message);
        }
        setFormData({ name: '', email: '', message: '' });
        return 'Xabar yuborildi! Tez orada javob beraman.';
      },
      error: (error: any) => `Xatolik yuz berdi. Iltimos, qayta urinib ko'ring. ${error?.message || ''}`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { contactInfo, loading: contactLoading } = useContactInfo();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="h-6 w-6" />,
      url: contactInfo?.github_url || 'https://github.com',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'Telegram',
      icon: <MessageSquare className="h-6 w-6" />,
      url: contactInfo?.telegram_url || 'https://telegram.org',
      color: 'hover:text-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-6 w-6" />,
      url: contactInfo?.linkedin_url || 'https://linkedin.com',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex p-3 rounded-full bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 mb-6">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/20 dark:border-gray-700/30 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <label htmlFor="name" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  {t('contact.name')}
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 bg-white/50 dark:bg-gray-900/50 border-2 border-transparent focus:border-blue-500/50 rounded-2xl text-gray-900 dark:text-white transition-all duration-300 outline-none font-bold"
                  />
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  {t('contact.email')}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-900/50 border-2 border-transparent focus:border-blue-500/50 rounded-2xl text-gray-900 dark:text-white transition-all duration-300 outline-none font-bold"
                />
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  {t('contact.message')}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-6 py-5 bg-white/50 dark:bg-gray-900/50 border-2 border-transparent focus:border-blue-500/50 rounded-2xl text-gray-900 dark:text-white transition-all duration-300 outline-none font-bold resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.4)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-2xl shadow-xl transition-all duration-300 text-lg uppercase tracking-wider"
              >
                <Send className="h-6 w-6 mr-3" />
                {t('contact.send')}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-8">
                {t('contact.phone')} & {t('contact.email')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 bg-blue-50/50 dark:bg-blue-900/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-800/30 group"
                >
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform">
                    <Phone className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-black text-blue-600/50 dark:text-blue-400/50 uppercase tracking-widest mb-1">Call Me</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white">
                    {contactLoading ? '...' : (contactInfo?.phone || '+998 90 003 37 23')}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-8 bg-green-50/50 dark:bg-green-900/20 rounded-[2.5rem] border border-green-100 dark:border-green-800/30 group"
                >
                  <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:-rotate-12 transition-transform">
                    <Mail className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-black text-green-600/50 dark:text-green-400/50 uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white truncate">
                    {contactLoading ? '...' : (contactInfo?.email || 'kursant410@gmail.com')}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-8 tracking-widest uppercase">
                {t('contact.social')}
              </h3>

              <div className="flex flex-wrap gap-5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.15, y: -10 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-6 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold transition-all shadow-sm hover:shadow-xl ${social.color}`}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}