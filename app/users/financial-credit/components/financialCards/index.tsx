import { Button } from '@/app/components/ui/Button'


const WalletIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
)

const TrendingUpIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
)

const currentBalance = 1350000
const totalDeposits = 6000000
const totalDeductions = 2900000
const payableAmount = 1500000

const fmt = (n: number) => n.toLocaleString('en-US')

function FinancialCard() {

    return (
        <>
            <div className="w-full flex flex-col gap-5  items-center justify-center" dir="rtl">

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="rounded-2xl p-6 h-41.25 flex flex-col  justify-center bg-linear-to-br from-emerald-500 to-teal-600 text-white">
                        <span className="text-2xs ">موجودی فعلی</span>
                        <span className="mt-2 text-[28px] font-extrabold  -translate-x-3"> {fmt(currentBalance)}</span>
                        <span className=" text-2xs text-neutral-200 font-semibold">تومان</span>
                    </div>

                    <div className=" rounded-2xl border border-neutral-300 bg-white p-5 flex items-start gap-5">
                        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-800/10 text-blue-800 flex items-center justify-center">
                            <TrendingUpIcon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-2xs text-gray-500">کل واریزی</span>
                            <span className="mt-1 text-[24px] font-semibold text-gray-900 leading-tight">{fmt(totalDeposits)}</span>
                            <span className="mt-2 rounded-full border border-green-300 bg-green-100 px-2 py-0.5 text-3xs text-green-800">
                                ۶ ماه اخیر
                            </span>
                        </div>
                    </div>

                    <div className=" rounded-2xl border border-neutral-300 bg-white p-5 flex items-start gap-5">
                        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-800/10 text-blue-800 flex items-center justify-center">
                            <WalletIcon className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className=" text-2xs text-gray-500">کل کسورات</span>
                            <span className="mt-1 text-[24px]  font-extrabold text-gray-900 leading-tight">{fmt(totalDeductions)}</span>
                            <span className="mt-2 rounded-full border border-red-300 bg-red-100 px-2 py-0.5 text-3xs text-red-700">
                                حق دوره و گواهی
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-s font-semibold text-gray-900">پرداخت حق دوره کارآموزی</h3>
                        <span className="rounded-full border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs text-green-800">
                            فعال
                        </span>
                    </div>

                    <div className="mt-10 flex items-center justify-between rounded-lg bg-neutral-100 px-5 py-4">
                        <div className="flex flex-col items-start">
                            <span className="text-2xs text-neutral-700">مبلغ قابل پرداخت</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-base font-extrabold text-gray-900">{fmt(payableAmount)}</span>
                                <span className="text-2xs text-gray-900">تومان</span>
                            </div>
                        </div>

                        <div >
                            <Button
                                type="button"
                                variant="solid"
                                color="input"
                                className="text-sm"
                                size="xs"
                                rounded="lg"
                                leftIcon={
                                    <WalletIcon className="w-5 h-5" />
                                }
                            >
                                پرداخت انلاین
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FinancialCard