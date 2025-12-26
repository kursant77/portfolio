import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Award, MapPin, Code2 } from 'lucide-react';

export default function About() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || 'uz';

    const stats = [
        { icon: <Code2 className="w-5 h-5" />, label: 'Experience', value: '3+ Years' },
        { icon: <Award className="w-5 h-5" />, label: 'Projects', value: '20+ Done' },
        { icon: <MapPin className="w-5 h-5" />, label: 'Location', value: currentLanguage === 'uz' ? 'Shovot, Xorazm' : 'Shovot, Khorezm' },
    ];

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <User className="text-blue-600 w-8 h-8" />
                            {currentLanguage === 'uz' ? 'Asadbek Jumanazarov haqida' : 'Who is Asadbek Jumanazarov?'}
                        </h2>

                        <div className="prose prose-blue dark:prose-invert max-w-none">
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {currentLanguage === 'uz' ? (
                                    <>
                                        <strong>Asadbek Jumanazarov</strong> - O'zbekistonning Xorazm viloyati Shovot tumanidan bo'lgan professional
                                        Full Stack dasturchi. U zamonaviy veb-texnologiyalar, xususan <strong>React, TypeScript, Node.js</strong>
                                        va <strong>Supabase</strong> ekotizimida yuqori tajribaga ega.
                                    </>
                                ) : (
                                    <>
                                        <strong>Asadbek Jumanazarov</strong> is a professional Full Stack Developer from
                                        Shovot, Khorezm region, Uzbekistan. He specializes in building high-performance
                                        web applications using <strong>React, TypeScript, Node.js</strong>, and <strong>Supabase</strong>.
                                    </>
                                )}
                            </p>

                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                {currentLanguage === 'uz' ? (
                                    "Uning asosiy maqsadi - bizneslar uchun murakkab muammolarni zamonaviy va samarali IT yechimlar orqali hal qilish. 2025-yil standartlariga mos keladigan CRM tizimlari, e-tijorat va korporativ veb-saytlarni ishlab chiqishda boy tajribaga ega."
                                ) : (
                                    "His main goal is to solve complex business problems through modern and efficient IT solutions. He has extensive experience in developing CRM systems, e-commerce, and corporate websites that meet 2025 industry standards."
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <div className="text-blue-600 mb-2">{stat.icon}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-500">{stat.label}</div>
                                    <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 p-1">
                            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center p-8 text-center italic text-gray-500">
                                {/* Real photo space */}
                                <img
                                    src="/me.png"
                                    alt="Asadbek Jumanazarov"
                                    className="w-full h-full object-cover rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="text-3xl font-bold text-blue-600">3+</div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {currentLanguage === 'uz' ? 'Yillik Tajriba' : 'Years Experience'}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
