import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, Eye, Award, Briefcase, GraduationCap } from 'lucide-react';
import { useCVInfo, useContactInfo } from '../hooks/useSupabaseData';

export default function CV() {
  const { t } = useTranslation();
  const { cvInfo, loading } = useCVInfo();
  const { contactInfo } = useContactInfo();

  const cvHighlights = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Experience',
      value: cvInfo?.experience || 'N/A',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Projects',
      value: cvInfo?.projects_count ? `${cvInfo.projects_count} Completed` : 'N/A',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Skills',
      value: cvInfo?.skills_count ? `${cvInfo.skills_count} Technologies` : 'N/A',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="cv" className="relative py-20 bg-gray-50 dark:bg-gray-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('cv.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('cv.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CV Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">
                  {cvInfo?.name ? cvInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AJ'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {loading ? 'Yuklanmoqda...' : (cvInfo?.name || 'Ism kiritilmagan')}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {loading ? '...' : (cvInfo?.title || 'Lavozim kiritilmagan')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {cvHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${highlight.color} text-white mb-2`}>
                    {highlight.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {highlight.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Skills</h4>
              {cvInfo?.key_skills && cvInfo.key_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {cvInfo.key_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">Key skills kiritilmagan</p>
              )}
            </div>
          </motion.div>

          {/* CV Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="space-y-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={cvInfo?.cv_file_url || "/cv.pdf"}
                download
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-lg"
              >
                <Download className="h-6 w-6 mr-3" />
                {t('cv.download')}
              </motion.a>

              <div className="block">
                {cvInfo?.cv_file_url ? (
                  <motion.a
                    href={cvInfo.cv_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-200 text-lg"
                  >
                    <Eye className="h-6 w-6 mr-3" />
                    {t('cv.view')}
                  </motion.a>
                ) : (
                  <motion.button
                    disabled
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-400 text-gray-400 font-semibold rounded-lg cursor-not-allowed opacity-50 text-lg"
                  >
                    <Eye className="h-6 w-6 mr-3" />
                    {t('cv.view')}
                  </motion.button>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Quick Contact Info
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                📞 {contactInfo?.phone || '+998 90 003 37 23'}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                ✉️ {contactInfo?.email || 'kursant410@gmail.com'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}