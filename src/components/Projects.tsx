import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github, Image } from "lucide-react";

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      id: "insta",
      image: "/insta.png",
      demoUrl: "https://vertificator.netlify.app/",
      githubUrl: "https://github.com/kursant77/insta-phisher",
    },
    {
      id: "golf",
      image: "/golf.png",
      demoUrl: "https://mygolfteam.netlify.app/",
      githubUrl: "https://github.com/kursant77/Golf-Club",
    },
    {
      id: "scholar",
      image: "/public/scholar.png",
      demoUrl: "https://scholar-learning.netlify.app/",
      githubUrl: "https://github.com/kursant77/scholar-learning-center",
    },
    {
      id: "cyberShield",
      image: "/public/cybershield.png",
      demoUrl: "https://cybershielduz.netlify.app/",
      githubUrl: "#",
    },
    {
      id: "Codygroup",
      image: "/public/cody.png",
      demoUrl: "https://cody-group.netlify.app/",
      githubUrl: "https://github.com/kursant77/cody-group",
    },
    {
      id: "purplebuzz",
      image: "/public/purplebuzz.png",
      demoUrl: "https://purple-buzz-web.netlify.app/",
      githubUrl: "https://github.com/kursant77/Purple-Buzz-web",
    },
  ];

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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={t(`projects.${project.id}.title`)}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.demoUrl}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t(`projects.${project.id}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t(`projects.${project.id}.description`)}
                </p>

                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.demoUrl}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("projects.liveDemo")}
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.githubUrl}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
