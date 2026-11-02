// export interface TabItem {
//     id: string;
//     label: string;
// }

// export interface TabsProps {
//     tabs: TabItem[];
//     activeTab: string;
//     onTabChange: (tabId: string) => void;
// }

// const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
//     return (
//         <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
//             {tabs.map((tab) => (
//                 <button
//                     key={tab.id}
//                     onClick={() => onTabChange(tab.id)}
//                     className={`outline-none px-4 py-3  w-full transition-all text-[17px] duration-200 border-b-2 ${activeTab === tab.id
//                             ? "border-input-700 text-input-700 font-bold "
//                             : "border-transparent text-gray-500  hover:text-gray-700"
//                         }`}
//                 >
//                     {tab.label}
//                 </button>
//             ))}
//         </div>
//     );
// };

// export default Tabs;


export interface TabItem {
    id: string;
    label: string;
}

export interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
    /** underline = رفتار قبلی (پیش‌فرض) | pill = تب‌های کپسولی مثل صفحه بازدیدها */
    variant?: "underline" | "pill";
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
    variant = "underline",
    className = "",
}) => {
    if (variant === "pill") {
        return (
            <div
                className={`flex gap-1 rounded-xl bg-slate-100 p-1 ${className}`}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onTabChange(tab.id)}
                            className={`flex-1 rounded-lg px-4 py-2 text-xs font-semibold outline-none transition-all duration-200 sm:text-sm ${isActive
                                    ? "bg-white text-neutral-900 shadow-sm"
                                    : "text-neutral-700 hover:text-neutral-950"
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`flex border-b border-gray-200 sticky top-0 bg-white z-10 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`outline-none px-4 py-3  w-full transition-all text-[17px] duration-200 border-b-2 ${activeTab === tab.id
                            ? "border-input-700 text-input-700 font-bold "
                            : "border-transparent text-gray-500  hover:text-gray-700"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;