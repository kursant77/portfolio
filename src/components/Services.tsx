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
                  y: -15,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                itemScope
                itemType="https://schema.org/Service"
                className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 dark:border-gray-700/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group overflow-hidden"
              >
                {/* Modern Decorative Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />

                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`relative inline-flex p-5 rounded-3xl bg-gradient-to-br ${service.color} text-white mb-8 shadow-xl shadow-green-500/20 transform group-hover:scale-110 transition-transform duration-500`}
                >
                  {getIcon(service.icon || 'Code')}
                </motion.div>

                <h3 itemProp="serviceType" className="text-2xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                  {getTitle(service)}
                </h3>

                <p itemProp="description" className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {t(`services.${service.key}.description`, { defaultValue: '' })}
                </p>

                {/* Bottom Bar Accent */}
                <div className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r ${service.color} w-0 group-hover:w-full transition-all duration-700`} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default React.memo(Services);
