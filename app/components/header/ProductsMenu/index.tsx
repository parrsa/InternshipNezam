'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'صنایع دستی',
        icon: '🎨',
        href: '/category/handicrafts',
        subcategories: [
            {
                name: 'سفال و سرامیک',
                href: '/category/pottery',
                subcategories: [
                    { name: 'سفال سنتی', href: '/category/traditional-pottery' },
                    { name: 'سرامیک مدرن', href: '/category/modern-ceramic' },
                    { name: 'کاشی و سرامیک', href: '/category/tile' },
                    { name: 'ظروف سفالی', href: '/category/pottery-dishes' },
                    { name: 'گلدان سفالی', href: '/category/pottery-vase' },
                    { name: 'مجسمه‌های سفالی', href: '/category/pottery-statue' },
                ]
            },
            {
                name: 'گلیم و فرش',
                href: '/category/carpet',
                subcategories: [
                    { name: 'گلیم', href: '/category/gelim' },
                    { name: 'فرش دستباف', href: '/category/handwoven-carpet' },
                    { name: 'قالیچه', href: '/category/rug' },
                    { name: 'تابلوفرش', href: '/category/carpet-painting' },
                    { name: 'گبه', href: '/category/gabbeh' },
                ]
            },
            {
                name: 'میناکاری',
                href: '/category/minakari',
                subcategories: [
                    { name: 'مینا روی مس', href: '/category/mina-on-copper' },
                    { name: 'مینا روی نقره', href: '/category/mina-on-silver' },
                    { name: 'مینا روی طلا', href: '/category/mina-on-gold' },
                    { name: 'ظروف میناکاری', href: '/category/mina-dishes' },
                    { name: 'زیورآلات مینا', href: '/category/mina-jewelry' },
                ]
            },
            {
                name: 'خاتم‌کاری',
                href: '/category/khatam',
                subcategories: [
                    { name: 'خاتم روی چوب', href: '/category/khatam-on-wood' },
                    { name: 'خاتم روی فلز', href: '/category/khatam-on-metal' },
                    { name: 'قاب خاتم', href: '/category/khatam-frame' },
                    { name: 'جعبه خاتم', href: '/category/khatam-box' },
                    { name: 'شطرنج خاتم', href: '/category/khatam-chess' },
                ]
            },
            { name: 'منبت‌کاری', href: '/category/monabat' },
            { name: 'معرق‌کاری', href: '/category/moaragh' },
            { name: 'فیروزه کوبی', href: '/category/firouzeh' },
            { name: 'قلمزنی', href: '/category/ghalamzani' },
        ]
    },
    {
        id: 2,
        name: 'پوشاک سنتی',
        icon: '👘',
        href: '/category/traditional-clothing',
        subcategories: [
            {
                name: 'لباس کردی',
                href: '/category/kordi',
                subcategories: [
                    { name: 'لباس کردی زنانه', href: '/category/kordi-women' },
                    { name: 'لباس کردی مردانه', href: '/category/kordi-men' },
                    { name: 'شال کردی', href: '/category/kordi-shawl' },
                    { name: 'کلاه کردی', href: '/category/kordi-hat' },
                ]
            },
            {
                name: 'لباس بلوچی',
                href: '/category/baluchi',
                subcategories: [
                    { name: 'لباس بلوچی زنانه', href: '/category/baluchi-women' },
                    { name: 'لباس بلوچی مردانه', href: '/category/baluchi-men' },
                    { name: 'سوزن‌دوزی بلوچی', href: '/category/baluchi-embroidery' },
                ]
            },
            {
                name: 'لباس قشقایی',
                href: '/category/gashgai',
                subcategories: [
                    { name: 'لباس قشقایی زنانه', href: '/category/gashgai-women' },
                    { name: 'کلاه قشقایی', href: '/category/gashgai-hat' },
                ]
            },
            { name: 'لباس ترکمن', href: '/category/turkmen' },
            { name: 'چادرشب', href: '/category/chadorshab' },
            { name: 'روسری و سربند', href: '/category/sarband' },
            { name: 'جوراب سنتی', href: '/category/joorab' },
        ]
    },
]
interface ProductsMenuProps {
    isOpen: boolean
    onClose: () => void
    headerHeight?: number
}
export function ProductsMenu({ isOpen, onClose, headerHeight = 80 }: ProductsMenuProps) {
    const [hoveredCategory, setHoveredCategory] = useState(categories[0])
    const [hoveredSubCategory, setHoveredSubCategory] = useState<any>(null)
    const [topPosition, setTopPosition] = useState(headerHeight)

    useEffect(() => {
        const handleScroll = () => {
            setTopPosition(headerHeight)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [headerHeight])


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    < motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-x-0 z-40 bg-black/20 backdrop-blur-sm"
                        style={{
                            top: headerHeight,
                            bottom: 0,
                            height: `calc(100vh - ${headerHeight}px)`
                        }}
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 z-50 w-250 -translate-x-1/2"
                        style={{ top: '88px' }}
                    >
                        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">


                            <div className="flex h-125">
                                <div className="w-64 border-l border-gray-100 bg-gray-50/50 p-4 overflow-y-auto">
                                    <Link
                                        href="/products"
                                        className="mb-4 flex items-center justify-between rounded-lg bg-button-primary-pink px-4 py-3 text-white transition-colors hover:bg-button-primary-pink/90"
                                        onClick={onClose}
                                    >
                                        <span className="font-medium">همه محصولات</span>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Link>

                                    <div className="space-y-1">
                                        {categories.map((category) => (
                                            <div
                                                key={category.id}
                                                className="relative"
                                                onMouseEnter={() => {
                                                    setHoveredCategory(category)
                                                    setHoveredSubCategory(null)
                                                }}
                                            >
                                                <Link
                                                    href={category.href}
                                                    className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-right transition-all ${hoveredCategory.id === category.id
                                                        ? 'text-[#A3004C] border-[0.5px] border-button-primary-pink bg-[#FDF2F8]/50'
                                                        : 'text-[#525252] hover:text-[#727456] border-[#D4D4D4] hover:bg-gray-100'
                                                        }`}
                                                    onClick={onClose}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">{category.icon}</span>
                                                        <span className="text-sm font-medium">{category.name}</span>
                                                    </div>
                                                    <ChevronLeft className={`h-4 w-4 ${hoveredCategory.id === category.id ? 'text-[#727456]' : 'text-gray-400'
                                                        }`} />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                                <div className="w-64 border-l border-gray-100 bg-white p-4 overflow-y-auto">
                                    <div className="mb-3">
                                        <h3 className="text-sm font-semibold text-[#525252] flex items-center gap-2">
                                            <span>{hoveredCategory.icon}</span>
                                            <span>{hoveredCategory.name}</span>
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">زیرمجموعه‌ها</p>
                                    </div>

                                    <div className="space-y-1">
                                        {hoveredCategory.subcategories.map((sub: any, index: number) => (
                                            <div
                                                key={index}
                                                className="relative"
                                                onMouseEnter={() => setHoveredSubCategory(sub)}
                                            >
                                                {sub.subcategories ? (
                                                    <div
                                                        className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-right transition-all cursor-default ${hoveredSubCategory?.name === sub.name
                                                            ? 'text-[#A3004C] border-[0.5px] border-button-primary-pink bg-[#FDF2F8]/50'
                                                            : 'text-[#525252] hover:text-[#727456] hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        <span className="text-sm">{sub.name}</span>
                                                        <ChevronLeft className="h-4 w-4 text-gray-400" />
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={sub.href}
                                                        className={`flex w-full items-center rounded-lg px-4 py-2.5 text-right transition-all ${hoveredSubCategory?.name === sub.name
                                                            ? 'text-[#A3004C] border-[0.5px] border-button-primary-pink bg-[#FDF2F8]/50'
                                                            : 'text-[#525252] hover:text-[#727456] hover:bg-gray-50'
                                                            }`}
                                                        onClick={onClose}
                                                    >
                                                        <span className="text-sm">{sub.name}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {hoveredSubCategory?.subcategories && (
                                    <div className="w-64 bg-gray-50/50 p-4 overflow-y-auto">
                                        <div className="mb-3">
                                            <h3 className="text-sm font-semibold text-[#525252]">
                                                {hoveredSubCategory.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">زیرمجموعه‌های بیشتر</p>
                                        </div>

                                        <div className="space-y-1">
                                            {hoveredSubCategory.subcategories.map((deepSub: any, index: number) => (
                                                <Link
                                                    key={index}
                                                    href={deepSub.href}
                                                    className="flex w-full items-center rounded-lg px-4 py-2 text-sm text-[#525252] transition-all hover:text-[#727456] hover:bg-white"
                                                    onClick={onClose}
                                                >
                                                    {deepSub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}