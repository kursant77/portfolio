import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Monitor, 
  FileText, 
  GraduationCap, 
  Server, 
  Code, 
  RefreshCw, 
  MessageCircle 
} from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      key: 'dynamic',
      icon: <Monitor className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'writing',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'teaching',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'hosting',
      icon: <Server className="h-8 w-8" />,
      color: 'from-red-500 to-orange-500'
    },
    {
      key: 'api',
      icon: <Code className="h-8 w-8" />,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      key: 'update',
      icon: <RefreshCw className="h-8 w-8" />,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      key: 'consulting',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'from-violet-500 to-purple-500'
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
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${service.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {t(`services.${service.key}`)}
              </h3>
              
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}