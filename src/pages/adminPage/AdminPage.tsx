import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import LayoutCommunity from "../../components/layout/LayoutCommunity";
import Sidebar from "../../components/community/sidebar/Sidebar";
import Header from "../../components/community/header/Header";
import MainContent from "../../components/community/mainContent/MainContent";
import styles from "./AdminPage.module.css";
import TabBar from "../../components/community/tabbar/Tabbar";

const AdminPage = () => {
    const { user } = useAppSelector(state => state.user);
    // const [ activeTab, setActiveTab ] = useState('1');
    const navigate = useNavigate();
    
    useEffect(() => { if (user?.role === 'USER') navigate('/profile') }, [])

    const tabs = [
        { id: '1', label: 'Мероприятия'},
        { id: '2', label: 'Пользовательницы'},
    ]
    
    return (
        user?.role !== 'ADMIN' ?
            <Navigate to={'/login'} state={{ from: location }} replace />
        :
            <LayoutCommunity>
                <div className={styles.community}>
                    <Sidebar>
                        {/* <TabBar tabs={tabs} onTabChange={(tabId) => setActiveTab(tabId)} /> */}
                        <TabBar tabs={tabs} />
                    </Sidebar>
                    <div className={styles.mainContent}>
                        <Header />
                        <MainContent />
                    </div>
                </div>
            </LayoutCommunity>
    )
}

export default AdminPage;
