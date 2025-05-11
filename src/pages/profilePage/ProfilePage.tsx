import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";


const ProfilePage = () => {
    const user = useAppSelector(state => state.user.user);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (user && user.role === 'ADMIN') {
            console.log(user)
            navigate('/admin')
        }
    }, [user])

    
    console.log(user)
    
    return (
        <Layout>
            <Card width='100%' backgroundColor='#426842fa'>
                Профиль

            </Card>
        </Layout>
    )
}

export default ProfilePage;