"use client"
import { Button } from '@/app/components/ui/Button'
import { cn } from '@/lib/cn'
import { Award, CheckCircle2, Download } from 'lucide-react'

type CertificateStatus = 'issued' | 'issuing'

interface CertificateItem {
    id: number
    title: string
    code: string
    date: string
    status: CertificateStatus
    fileUrl?: string
}

const CERTIFICATES: CertificateItem[] = [
    {
        id: 1,
        title: 'گواهی تکمیل دوره — مدیریت پیمان',
        code: 'CERT-203-9452',
        date: '۱۴۰۴/۰۴/۳۰',
        status: 'issued',
    },
    {
        id: 2,
        title: 'گواهی تکمیل دوره — مقررات ملی',
        code: 'CERT-101-6721',
        date: '۱۴۰۴/۰۲/۱۵',
        status: 'issued',
    },
    {
        id: 3,
        title: 'گواهی بازدید فنی — برج پارسیان',
        code: 'CERT-VST-1180',
        date: '۱۴۰۴/۰۱/۲۰',
        status: 'issuing',
    },
]

const STATUS_MAP: Record<CertificateStatus, { label: string; className: string }> = {
    issued: {
        label: 'صادر شده',
        className: 'bg-[#C9F1DE] border-[#8FD9B3] text-[#0F6B45]',
    },
    issuing: {
        label: 'در حال صدور',
        className: 'bg-[#FDE6C8] border-[#F7C58A] text-[#9A4A0A]',
    },
}

function CertifiCates() {

    const handleDownload = (item: CertificateItem) => {
        if (item.fileUrl) window.open(item.fileUrl, '_blank')
    }

    return (
        <div className='w-full flex flex-col gap-3 px-5 p-2'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {CERTIFICATES.map((item) => {
                    const status = STATUS_MAP[item.status]

                    return (
                        <div
                            key={item.id}
                            className='bg-white border border-[#E1E1DD] rounded-xl overflow-hidden pt-6.25 shadow-md'
                        >
                            <div className='relative h-32 w-full flex items-center justify-center bg-linear-to-br from-[#FEEFC3] to-[#FFF9E8]'>
                                <span
                                    className={`absolute left-2.75 top-3.75 inline-flex items-center justify-center h-5.5 px-2 rounded-full border text-3xs leading-none ${status.className}`}
                                >
                                    {status.label}
                                </span>

                                <Award
                                    size={65}
                                    strokeWidth={2}
                                    color='rgba(255,160,30,0.55)'
                                />
                            </div>

                            <div className='px-5 pt-9 pb-9 flex flex-col'>
                                <h3 className='h-3 flex items-center text-xs font-bold text-[#111] m-0'>
                                    {item.title}
                                </h3>

                                <p className='h-3 mt-3 flex items-center text-2xs text-neutral-500 m-0'>
                                    کد گواهی: <span dir='ltr' className='mr-1 '>{item.code}</span>
                                </p>

                                <p className='h-5 mt-1  flex items-center text-2xs  text-neutral-500 m-0'>
                                    تاریخ صدور: <span className='mr-1'>{item.date}</span>
                                </p>

                                <Button
                                    leftIcon={
                                        <CheckCircle2 size={18} strokeWidth={1.75} />
                                    }
                                    onClick={() => handleDownload(item)}
                                    size="xs"
                                    rounded='lg'
                                    variant="solid"
                                    type="button"
                                    textSize='sm'
                                    className={cn("flex w-full items-center mt-3 justify-center gap-2 h-8  border border-gray-200 bg-amber-50/40  text-nowrap  text-neutral-900 transition-colors active:text-neutral-950 active:bg-teal-50 hover:text-neutral-950 hover:bg-teal-50")}
                                >
                                    <span>دانلود PDF</span>
                                </Button>
                          
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CertifiCates