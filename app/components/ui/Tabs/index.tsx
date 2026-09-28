export interface TabItem {
    id: string;
    label: string;
}

export interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-gray-200 sticky top-0 bg-white z-10">
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
