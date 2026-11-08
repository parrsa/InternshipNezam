function Loading() {
    return (
        <div dir="rtl" className="relative flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-[#1A4B8C] to-[#0E3260] overflow-hidden text-white">
            <div className="absolute bottom-0 left-0 w-full h-40 bg-white/10 rounded-t-[50%] blur-3xl"></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 border-4 border-t-transparent border-white/40 rounded-full animate-spin mb-6"></div>
                <h1 className="text-2xl font-bold">سازمان نظام مهندسی تهران</h1>
                <p className="text-sm text-white/80 mt-2">در حال بارگذاری سامانه رزرو غذا...</p>
            </div>
        </div>
    );
}
export default Loading