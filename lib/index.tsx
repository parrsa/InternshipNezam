import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderAction } from "../../../../core/provider/HeaderActionProvider/HeaderAction.js";
import HeaderSubPages from "../../../../components/ui/HeaderSubPages/index.js";
import AdminRequestDetailsPersonalnfoTab from "../../request/[details]/components/personalnfoTab/index.js";
import AdminRequestDetailsEcoTourismTab from "../../request/[details]/components/ecoTourismTab/index.js";
import AdminEcoTourismDetailsEcoTourismDesc from "./components/ecoTourismDesc/index.js";
import Tabs from "../../../../components/ui/Tabs/index.js";

type TabId = "ecoTourism" | "personalInfo";

export default function AdminEcoToruismDetails() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabId>("personalInfo");
    const { setAction } = useHeaderAction()
    const tabs = [
        { id: "personalInfo", label: "مشخصات فردی (12)" },
        { id: "ecoTourism", label: "مشخصات بوم گردی (10)" },
    ];
    useEffect(() => {
        setAction(<HeaderSubPages title="جزئیات بوم گردی" link="/admin" />)
        return () => setAction(null)
    }, [])
    return (
        <div className="flex flex-col gap-3">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(id: string) => setActiveTab(id as TabId)} />
            {activeTab === 'ecoTourism' && <AdminEcoTourismDetailsEcoTourismDesc />}
            {activeTab === 'personalInfo' && <AdminRequestDetailsPersonalnfoTab />}

        </div>
    )
}