import { useState, useEffect } from 'react';
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [err, setErr] = useState(false);

    useEffect(() => {
        setErrMsg('');
        setErr(false);
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.accessToken;
            setAuth({ username, accessToken });
            navigate(from, { replace: true });
        }
        catch (error) {
            if (!error?.response) {
                setErrMsg('Server is down. Please try again later.');
            }
            else if (error.response?.status === 400) {
                setErrMsg('Missing username or password.');
            }
            else if (error.response?.status === 401) {
                setErrMsg('Invalid username or password.');
            }
            else {
                setErrMsg('Login failed.')
            }
            setErr(true);
        }
    };

    return (
        <section className='register'>
            <form onSubmit={handleSubmit} className='register-form'>
                {err && (
                    <p className='form-error'>
                        {errMsg}
                    </p>
                )}

                <h1 className="form-title">Sign-In</h1>

                <label htmlFor='username' className='form-label'>
                    Username:
                </label>
                <input
                    className='form-input'
                    type='text'
                    id='username'
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />


                <label htmlFor='password' className='form-label'>
                    Password:
                </label>
                <input
                    className='form-input'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                <button className='form-submit-valid'>Log In</button>
                <p className='form-footer'>
                    Need an Accout? <br />
                    <span className='form-signin'>
                        <a href='#'>Sign Up</a>
                    </span>
                </p>
            </form>
        </section>
    )
};

export default Login;