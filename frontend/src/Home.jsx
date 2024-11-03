import Users from './components/Users';
import axios from './api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

const LOGOUT_URL = '/auth/logout';

const Home = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {  
        try {
            await axios.get(LOGOUT_URL, { withCredentials: true });
            setAuth({});
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className='home'>
            <div className='register-form'>
                <h1 className="form-title">Home</h1>
                <Users />
                <button onClick={handleLogout} className='logout-button'>Logout</button>
            </div>
        </section>
    )
};

export default Home;