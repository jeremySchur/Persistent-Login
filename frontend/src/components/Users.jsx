import { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useLocation} from 'react-router-dom';

const Users = () => {
    const effectRan = useRef(false);
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!effectRan.current) {
            const getUsers = async () => {
                try {
                    const response = await axiosPrivate.get('/api/users');
                    setUsers(response.data);
                } 
                catch (error) {
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }

            getUsers();

            return () => {
                effectRan.current = true;
            }
        }
    }, []);

    return (
        <article>
            <h2 className='users-title'>Users List:</h2>
            {users?.length ? (
                <ul className='users-list'>
                    {users.map((user, index) => (
                        <li key={index}>{user?.username}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </article>
    )
};

export default Users;