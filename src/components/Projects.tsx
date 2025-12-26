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
    <section id="projects" className="relative py-24 bg-transparent dark:bg-gray-900">

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
                  whileHover={{ y: -15, scale: 1.02 }}
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                  className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-2xl border border-white/20 dark:border-gray-700/30 transition-all duration-500 group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      loading="lazy"
                      itemProp="image"
                      src={project.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 border-b border-white/10">
                      <div className="flex space-x-4">
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.demo_url}
                          itemProp="url"
                          className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl transition-all font-bold flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span>Demo</span>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.github_url}
                          className="p-4 bg-gray-800/80 backdrop-blur-md text-white rounded-2xl hover:bg-gray-900 shadow-xl transition-all font-bold flex items-center gap-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                          <span>Code</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 itemProp="name" className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {title}
                    </h3>
                    <p itemProp="description" className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed font-medium">
                      {description}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                        Project Details
                      </span>
                      <div className="flex -space-x-2">
                        {/* Decorative avatars for 'team' feel or tech stack icons could go here */}
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold text-blue-600 tracking-tighter">JS</div>
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold text-purple-600 tracking-tighter">TS</div>
                        <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] font-bold text-green-600 tracking-tighter">API</div>
                      </div>
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
