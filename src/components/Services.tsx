import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useServices } from '../hooks/useSupabaseData';
import { getIcon } from '../utils/iconMapper';

function Services() {
  const { t, i18n } = useTranslation();
  const { services, loading } = useServices();
  const currentLanguage = i18n.language || 'uz';

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

  const getTitle = useMemo(() => {
    return (service: any) => {
      switch (currentLanguage) {
        case 'en':
          return service.title_en || service.title_uz || '';
        case 'ru':
          return service.title_ru || service.title_uz || '';
        default:
          return service.title_uz || '';
      }
    };
  }, [currentLanguage]);

  return (
    <section id="services" className="relative py-20 bg-white dark:bg-gray-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} text-white mb-6`}>
                  {getIcon(service.icon || 'Code')}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {getTitle(service)}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {t(`services.${service.key}.description`, { defaultValue: '' })}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default React.memo(Services);
