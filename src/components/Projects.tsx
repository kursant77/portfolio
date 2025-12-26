import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import { useProjects } from "../hooks/useSupabaseData";

function Projects() {
  const { t, i18n } = useTranslation();
  const { projects, loading, error, refetch } = useProjects();

  const currentLanguage = i18n.language || 'uz';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="relative py-20 bg-gray-50 dark:bg-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-4 dark:text-red-400">
                {currentLanguage === 'uz' ? "Ma'lumotlarni yuklashda xatolik yuz berdi" : "Error loading projects"}
              </p>
              <button
                onClick={refetch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentLanguage === 'uz' ? "Qayta urinish" : "Retry"}
              </button>
            </div>
          ) : loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Yuklanmoqda...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Hozircha loyihalar yo'q</p>
            </div>
          ) : (
            projects.map((project) => {
              const titleKey = `title_${currentLanguage}` as keyof typeof project;
              const descKey = `description_${currentLanguage}` as keyof typeof project;
              const title = project[titleKey] as string || project.title_uz || '';
              const description = project[descKey] as string || project.description_uz || '';

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group"
                >
                  <div className="relative group">
                    <img
                      loading="lazy"
                      itemProp="image"
                      src={project.image}
                      alt={title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.demo_url}
                          itemProp="url"
                          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.github_url}
                          className="p-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 itemProp="name" className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {title}
                    </h3>
                    <p itemProp="description" className="text-gray-600 dark:text-gray-400 mb-4">
                      {description}
                    </p>

                    <div className="flex space-x-3">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.demo_url}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("projects.liveDemo")}
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.github_url}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        {t("projects.github")}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(Projects);
