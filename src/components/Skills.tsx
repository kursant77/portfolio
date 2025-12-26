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
    <section id="skills" className="relative py-24 bg-transparent dark:bg-gray-800">

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
            displaySkills.map((skill: any, index: number) => (
              <motion.div
                key={skill.id || skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group overflow-hidden"
              >
                {/* Background Accent */}
                <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${skill.color} opacity-10 group-hover:opacity-20 rounded-full transition-opacity duration-500`} />

                <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} text-white mb-6 shadow-lg shadow-blue-500/20 transform group-hover:rotate-6 transition-transform duration-500`}>
                  {getIcon(skill.icon || 'Code')}
                </div>

                <h3 itemProp="knowsAbout" className="text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                  {skill.name}
                </h3>

                <div className="space-y-3">
                  <div className="w-full bg-gray-200/50 dark:bg-gray-700/30 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                      Mastery
                    </span>
                    <span className="text-lg font-black text-gray-900 dark:text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Skills);