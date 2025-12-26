import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || 'uz';
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = {
        uz: [
            {
                q: "Asadbek Jumanazarov kim?",
                a: "Asadbek Jumanazarov - O'zbekistonning Xorazm viloyati Shovot tumanidan bo'lgan professional Full Stack dasturchi. U React, TypeScript va Node.js texnologiyalari bo'yicha mutaxassis."
            },
            {
                q: "Qanday loyihalar bilan ishlaysiz?",
                a: "Men asosan biznes uchun CRM tizimlari, e-tijorat platformalari, korporativ veb-saytlar va murakkab veb-ilovalarni ishlab chiqish bilan shug'ullanaman."
            },
            {
                q: "Xizmatlaringiz qancha vaqt davom etadi?",
                a: "Loyiha murakkabligiga qarab, odatda 1 haftadan 2 oygacha vaqt olishi mumkin. Har bir loyiha uchun alohida muddat belgilanadi."
            },
            {
                q: "Siz bilan bog'lanishning eng tez yo'li nima?",
                a: "Telegram (@kursant77) yoki +998 90 003 37 23 telefon raqami orqali bog'lanish eng tezkor usul hisoblanadi."
            }
        ],
        en: [
            {
                q: "Who is Asadbek Jumanazarov?",
                a: "Asadbek Jumanazarov is a professional Full Stack Developer from Shovot, Khorezm region, Uzbekistan. He specializes in React, TypeScript, and Node.js."
            },
            {
                q: "What kind of projects do you handle?",
                a: "I work on business CRM systems, e-commerce platforms, corporate websites, and complex web applications."
            },
            {
                q: "What is the best way to contact you?",
                a: "The fastest way is through Telegram (@kursant77) or by phone at +998 90 003 37 23."
            }
        ],
        ru: [
            {
                q: "Кто такой Асадбек Джуманазаров?",
                a: "Асадбек Джуманазаров — профессиональный Full Stack разработчик из Шаватского района Хорезмской области, Узбекистан. Специализируется на React, TypeScript и Node.js."
            }
        ]
    };

    const currentFaqs = faqs[currentLanguage as keyof typeof faqs] || faqs.uz;

    return (
        <section id="faq" className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 italic">
                        {currentLanguage === 'uz' ? "Ko'p so'raladigan savollar" : "Frequently Asked Questions"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {currentLanguage === 'uz' ? "Savollaringizga tezkor javoblar" : "Quick answers to common questions"}
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {currentFaqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left bg-gray-50/50 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 dark:text-white pr-8">
                                    {faq.q}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {activeIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-2 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
