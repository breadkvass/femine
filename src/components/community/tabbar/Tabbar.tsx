import { FC, useState } from "react";
import { Tab } from "../../../utils/types";
import styles from './Tabbar.module.css';

type TabBarProps = {
    // onTabChange: (tabId: string) => void;
    tabs: Tab[];
}

const TabBar: FC<TabBarProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

    const handleClick = (tabId: string) => {
        setActiveTab(tabId);
        // onTabChange(tabId);
    };

    return (
        <ul className={styles.tab}>
            {tabs.map(tab => (
                <li
                    key={tab.id}
                    className={`${styles.tabItem} ${activeTab === tab.id ? styles.active : ""}`}
                    onClick={() => handleClick(tab.id)}
                >
                    {tab.label}
                </li>
            ))}
        </ul>
    );
};

export default TabBar;
