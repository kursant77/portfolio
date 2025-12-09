import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSkills } from '../hooks/useSupabaseData';
import { getIcon } from '../utils/iconMapper';

function Skills() {
  const { t } = useTranslation();
  const { skills, loading } = useSkills();

  // Fallback skills if database is empty
  const fallbackSkills = [
    {
      name: 'HTML',
      level: 95,
      color: 'from-orange-400 to-red-500',
      icon: 'Globe'
    },
    {
      name: 'CSS',
      level: 90,
      color: 'from-blue-400 to-blue-600',
      icon: 'Palette'
    },
    {
      name: 'JavaScript',
      level: 88,
      color: 'from-yellow-400 to-yellow-600',
      icon: 'Code'
    }
  ];

  const displaySkills = skills.length > 0 ? skills : fallbackSkills;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="relative py-20 bg-white dark:bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
            </div>
          ) : (
            displaySkills.map((skill, index) => (
              <motion.div
                key={skill.id || skill.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white mb-4`}>
                  {getIcon(skill.icon || 'Code')}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {skill.name}
                </h3>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
                
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {skill.level}%
                </span>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Skills);