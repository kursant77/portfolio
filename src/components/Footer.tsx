import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Github,
  MessageSquare,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Youtube,
} from "lucide-react";
import { hr } from "framer-motion/client";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com",
      color: "hover:text-gray-300",
    },
    {
      name: "Telegram",
      icon: <MessageSquare className="h-5 w-5" />,
      url: "https://t.me",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "https://instagram.com",
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com",
      color: "hover:text-sky-400",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "https://facebook.com",
      color: "hover:text-blue-500",
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:asadbek@example.com",
      color: "hover:text-red-400",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "https://youtube.com",
      color: "hover:text-red-500",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-12 mt-10 pt-8 border-t border-gray-700"
    >
      <div className="flex flex-col gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yuqori qism: slogan + nav + social */}
        <div className="flex flex-col md:flex-row lg:items-start  justify-between items-center gap-8">
          {/* Slogan chap tomonda */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 text-center md:text-left "
          >
            <h3 className="text-lg md:text-xl font-semibold">
              🚀 {t("footer.slogan")}
            </h3>
            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition ease-in-out duration-300 ${link.color}`}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation links */}

          <motion.div>
            <h3 className="text-center lg:text-start">Tezkor linklar</h3>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col mt-4 flex-wrap justify-center gap-2 text-gray-400 text-sm md:text-base text-center lg:text-start"
            >
              <li>
                <a
                  href="#hero"
                  className="hover:text-blue-400 transition ease-in-out duration-300"
                >
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-400 transition ease-in-out duration-300"
                >
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition ease-in-out duration-300"
                >
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-blue-400 transition ease-in-out duration-300"
                >
                  {t("footer.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-400 transition ease-in-out duration-300"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </motion.ul>
          </motion.div>
          {/* Resources bo‘limi */}
          <div className="flex flex-col justify-center align-center">
            <h3 className="mb-3 text-center lg:text-start">
              {t("footer.resourcesTitle")}
            </h3>
            <ul className="space-y-2 text-gray-400 text-center lg:text-start">
              <li>
                <a href="#about" className="hover:text-white">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  {t("footer.faq")}
                </a>
              </li>
              <li>
                <span className="cursor-not-allowed text-gray-500">
                  {t("footer.blog")}
                </span>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pastki copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 pt-6 border-t border-gray-700 text-center"
      >
        <p className="text-gray-500 text-sm">
          © 2025 Asadbek Jumanazarov. {t("footer.rights")}
        </p>
      </motion.div>
    </motion.footer>
  );
}
