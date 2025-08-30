import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Palette, GitBranch, Figma, Globe, Smartphone } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();

  const skills = [
    {
      name: 'HTML',
      icon: <Globe className="h-8 w-8" />,
      level: 95,
      color: 'from-orange-400 to-red-500'
    },
    {
      name: 'CSS',
      icon: <Palette className="h-8 w-8" />,
      level: 90,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'JavaScript',
      icon: <Code className="h-8 w-8" />,
      level: 88,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'React',
      icon: <Code className="h-8 w-8" />,
      level: 85,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Tailwind CSS',
      icon: <Palette className="h-8 w-8" />,
      level: 92,
      color: 'from-teal-400 to-blue-500'
    },
    {
      name: 'Bootstrap',
      icon: <Smartphone className="h-8 w-8" />,
      level: 80,
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Git & GitHub',
      icon: <GitBranch className="h-8 w-8" />,
      level: 82,
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Figma',
      icon: <Figma className="h-8 w-8" />,
      level: 75,
      color: 'from-pink-400 to-purple-500'
    }
  ];

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
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white mb-4`}>
                {skill.icon}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}