import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Award, MapPin, Code2 } from 'lucide-react';
import { useAboutSection, useCVInfo, useContactInfo } from '../hooks/useSupabaseData';

export default function About() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || 'uz';
    const { aboutData, loading: aboutLoading } = useAboutSection();
    const { cvInfo, loading: cvLoading } = useCVInfo();
    const { contactInfo } = useContactInfo();

    if ((aboutLoading || cvLoading) && !aboutData) {
        return (
            <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const titleKey = `title_${currentLanguage}` as keyof typeof aboutData;
    const contentKey = `content_${currentLanguage}` as keyof typeof aboutData;

    const displayTitle = aboutData?.[titleKey] || (currentLanguage === 'uz' ? 'Asadbek Jumanazarov haqida' : 'Who is Asadbek Jumanazarov?');
    const displayContent = aboutData?.[contentKey] || '';

    const stats = [
        {
            icon: <Code2 className="w-5 h-5" />,
            label: currentLanguage === 'uz' ? 'Tajriba' : 'Experience',
            value: cvInfo?.experience || '3+ Years'
        },
        {
            icon: <Award className="w-5 h-5" />,
            label: currentLanguage === 'uz' ? 'Loyihalar' : 'Projects',
            value: cvInfo?.projects_count || '20+ Done'
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: currentLanguage === 'uz' ? 'Manzil' : 'Location',
            value: currentLanguage === 'uz' ? 'Shovot, Xorazm' : 'Shovot, Khorezm'
        },
    ];

    return (
        <section id="about" className="py-24 overflow-hidden relative bg-white/5 dark:bg-gray-900 backdrop-blur-[2px] transition-colors duration-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        className="inline-flex p-5 rounded-3xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-10 border border-white/20 dark:border-blue-700/30 shadow-2xl"
                    >
                        <User className="w-10 h-10" />
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                            {displayTitle as string}
                        </span>
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-[1.8] font-medium whitespace-pre-wrap">
                            {displayContent as string}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                className="p-10 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-gray-700/30 shadow-xl"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="text-blue-600 dark:text-blue-400 mb-6 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl shadow-inner">
                                        {stat.icon}
                                    </div>
                                    <div className="text-xs font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-[0.3em] font-sans">
                                        {stat.label}
                                    </div>
                                    <div className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                                        {stat.value}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
