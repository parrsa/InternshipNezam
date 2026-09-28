'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, HelpCircle, ChevronDown, ChevronUp, Headphones, Send } from 'lucide-react';
import { Fab, Button } from '../Button';

interface FAQ {
    id: number
    question: string
    answer: string
}

const faqs: FAQ[] = [
    {
        id: 1,
        question: 'چگونه می‌توانم سفارش خود را ثبت کنم؟',
        answer: 'برای ثبت سفارش کافیست محصول مورد نظر را انتخاب کرده و به سبد خرید اضافه کنید. سپس مراحل پرداخت را تکمیل نمایید.'
    },
    {
        id: 2,
        question: 'مدت زمان ارسال سفارش چقدر است؟',
        answer: 'مدت زمان ارسال سفارشات بستگی به موقعیت مکانی شما دارد و معمولاً بین ۳ تا ۷ روز کاری متغیر است.'
    },
    {
        id: 3,
        question: 'روش‌های پرداخت کدامند؟',
        answer: 'شما می‌توانید از طریق کارت‌های عضو شتاب، پرداخت اینترنتی و یا کارت به کارت سفارش خود را پرداخت کنید.'
    }
]

interface SupportWidgetProps {
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "input"
}

export const SupportWidget = ({
    position = "bottom-right",
    color = "primary"
}: SupportWidgetProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openFaqId, setOpenFaqId] = useState<number | null>(null)

    const toggleFaq = (id: number) => {
        setOpenFaqId(openFaqId === id ? null : id)
    }

    return (
        <div className={`fixed hidden lg:flex ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} z-50`}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                        style={{ maxHeight: 'calc(100vh - 120px)' }}
                    >
                        <div className="bg-primary-700 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Headphones className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">پشتیبانی آنلاین</h3>
                                        <p className="text-xs text-white/80">پاسخگویی ۲۴ ساعته</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 max-h-96 overflow-y-auto no-scrollbar">
                            <div className="text-center mb-4">
                                <p className="text-sm text-foreground-light">
                                    سلام! 👋
                                </p>
                                <p className="text-xs text-foreground-lighter mt-1">
                                    اینجا می‌تونی تعدادی از پرسش‌های متداول را ببینی
                                </p>
                            </div>

                            <div className="space-y-2 mb-4">
                                <h4 className="text-sm font-medium text-foreground mb-2">
                                    سوالات متداول
                                </h4>
                                {faqs.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className="border border-gray-100 rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full flex items-center justify-between p-3 text-right hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-foreground">
                                                {faq.question}
                                            </span>
                                            {openFaqId === faq.id ? (
                                                <ChevronUp className="h-4 w-4 text-foreground-lighter" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-foreground-lighter" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {openFaqId === faq.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-3 pb-3 text-sm text-foreground-light bg-gray-50"
                                                >
                                                    {faq.answer}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-2">
                                <Button
                                    variant="solid"
                                    size='md'
                                    color={color}
                                    fullWidth
                                    leftIcon={<Send className="h-4 w-4" />}
                                    onClick={() => window.location.href = '/contact'}
                                >
                                    <span>تماس با ما</span>
                                </Button>

                                <p className="text-xs text-center text-foreground-lighter mt-3">
                                    کارشناسان ما آماده پاسخگویی به سوالات شما هستند
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative group">
                <Fab
                    icon={isOpen ? <X className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
                    label="پشتیبانی"
                    position={position}
                    color={color}
                    variant="fabSupport"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        transition-all duration-300
                        ${isOpen ? 'rotate-90' : ''}
                    `}
                />

                {!isOpen && (
                    <span className="absolute left-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        پشتیبانی آنلاین
                        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-r-gray-800 border-l-transparent border-t-transparent border-b-transparent" />
                    </span>
                )}
            </div>
        </div>
    )
}