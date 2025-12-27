import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useFAQs } from '../hooks/useSupabaseData';

export default function FAQ() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || 'uz';
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const { faqs, loading: faqsLoading } = useFAQs();

    if (faqsLoading && faqs.length === 0) {
        return (
            <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

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

                <div className="space-y-6">
                    {faqs.map((faq, idx) => {
                        const questionKey = `question_${currentLanguage}` as keyof typeof faq;
                        const answerKey = `answer_${currentLanguage}` as keyof typeof faq;
                        const question = (faq[questionKey] as string) || faq.question_uz;
                        const answer = (faq[answerKey] as string) || faq.answer_uz;

                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-gray-700/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all group"
                                >
                                    <span className={`text-lg font-black tracking-tight transition-colors duration-300 ${activeIndex === idx ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                        {question}
                                    </span>
                                    <div className={`p-2 rounded-xl transition-all duration-500 ${activeIndex === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {activeIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                        >
                                            <div className="p-8 pt-2 text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed border-t border-white/10 dark:border-gray-700/20 whitespace-pre-wrap">
                                                {answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
