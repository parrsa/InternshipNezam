"use client";;
import { SESSION_COOKIE_NAME, SSO_BASE } from "@/app/components/As";
import { removeCookie } from "@/lib/cookie";

export const AuthErrorPage = () => {
    const handleReLogin = () => {
        removeCookie(SESSION_COOKIE_NAME);
        localStorage.removeItem(SESSION_COOKIE_NAME);
        window.location.href = `${SSO_BASE}/account/login?returnUrl=${encodeURIComponent(
            window.location.href
        )}`;
    };

    const handleGoHome = () => {
        window.location.href = window.location.origin;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center ">
            <div className="max-w- w-full">
                <div className="relative bg-white  shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm">
                    <div className="relative h-40 overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-red-500 via-rose-500 to-orange-500"></div>
                        <div
                            className="absolute top-0 left-0 w-full h-full opacity-20"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}
                        ></div>

                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <div className="w-28 h-28 rounded-full bg-white shadow-2xl flex items-center justify-center border-8 border-white">
                                    <div className="w-20 h-20 rounded-full bg-linear-to-r from-red-100 to-orange-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                                    <span className="text-white text-sm font-bold">!</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-12 px-8 md:px-12 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
                            دسترسی موقتاً غیرفعال شد
                        </h1>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            به دلیل ملاحظات امنیتی، دسترسی شما به سیستم محدود شده است.
                        </p>

                        <div className="bg-linear-to-r from-gray-50 to-slate-100 rounded-2xl p-6 mb-10 text-right border border-gray-200">
                            <h3 className="text-gray-800 font-semibold text-lg mb-4 flex items-center  gap-2">
                                <span>دلایل احتمالی:</span>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "🔐 گذشت زمان طولانی از آخرین فعالیت",
                                    "📱 ورود از دستگاه یا موقعیت مکانی جدید",
                                    "🔄 تغییر اطلاعات حساب کاربری",
                                    "⏰ پایان اعتبار نشست کاری",
                                ].map((reason, index) => (
                                    <li key={index} className="text-gray-700 flex items-center gap-3 hover:text-gray-900 transition-colors">
                                        <span className="text-gray-500 text-sm">{index + 1}.</span>
                                        <span className="flex-1 text-right">{reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <button
                                onClick={handleReLogin}
                                className="group relative h-16 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    ورود مجدد به سیستم
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="group h-16 bg-linear-to-r from-slate-100 to-gray-100 text-gray-800 rounded-2xl font-semibold text-lg border-2 border-gray-300 transition-all duration-300 hover:from-white hover:to-gray-50 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                            >
                                <span className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    تلاش مجدد
                                </span>
                            </button>
                        </div>



                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-red-500/5 rounded-full -z-10"></div>
                        <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-500/5 rounded-full -z-10"></div>
                    </div>
                </div>


            </div>
        </div>
    );
};