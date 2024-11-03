import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const sent = useRef(false);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                if (!auth?.accessToken && !sent.current) {
                    await refresh();
                    sent.current = true;
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth?.accessToken, refresh]);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Outlet />
            )}
        </>
    )
};

export default PersistLogin;