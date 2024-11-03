import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register';

const Register = () => {
    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [confirmPass, setConfirmPass] = useState('');
    const [validConfirmPass, setValidConfirmPass] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPass(PASSWORD_REGEX.test(password));
        setValidConfirmPass(password === confirmPass);
    }, [password, confirmPass]);

    useEffect(() => {
        setErrMsg('');
        setErr(false);
    }, [username, password, confirmPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg('Invalid username or password.');
            return;
        }

        try {
            const res = await axios.post(REGISTER_URL,
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
            setSuccess(true);
        }
        catch (error) {
            if (!error?.response) {
                setErrMsg('Network error. No server response.');
            }
            else if (error.response?.status === 409) {
                setErrMsg('Username already exists.');
            }
            else {
                setErrMsg('Registration Failed.');
            }
            setErr(true);
        }
    };

    return (
        <>
            {success ? (
                <section className='register'>
                    <div className='register-form'>
                        <h1 className='form-title'>Success</h1> <br />
                        <span className='form-signin'>
                            <a href='#'>Sign In</a>
                        </span>
                    </div>
                </section>
            ) : (
                <section className='register'>
                    <form onSubmit={handleSubmit} className='register-form'>
                        {err && (
                            <p className='form-error'>
                                {errMsg}
                            </p>
                        )}

                        <h1 className="form-title">Register</h1>

                        <label htmlFor='username' className='form-label'>
                            Username:
                            {username && (
                                <span className='form-icon'>
                                    <FontAwesomeIcon
                                        icon={validName ? faCheck : faTimes}
                                        color={validName ? 'green' : 'red'}
                                    />
                                </span>
                            )}
                        </label>
                        <input
                            className='form-input'
                            type='text'
                            id='username'
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required
                        />
                        {userFocus && !validName && (
                            <p className="form-instructions">
                                <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon' />
                                4-24 characters. <br />
                                Must start with a letter. <br />
                                Letters, numbers, hyphens, and underscores allowed.
                            </p>
                        )}


                        <label htmlFor='password' className='form-label'>
                            Password:
                            {password && (
                                <span className='form-icon'>
                                    <FontAwesomeIcon
                                        icon={validPass ? faCheck : faTimes}
                                        color={validPass ? 'green' : 'red'}
                                    />
                                </span>
                            )}
                        </label>
                        <input
                            className='form-input'
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                            required
                        />
                        {passFocus && !validPass && (
                            <p className="form-instructions">
                                <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon'/>
                                8-24 characters. <br />
                                Must include uppercase and lowercase letters, a number, and a special character. <br />
                                Allowed special characters: ! @ # $ %
                            </p>
                        )}


                        <label htmlFor='confirm-password' className='form-label'>
                            Confirm Password:
                            {confirmPass && (
                                <span className='form-icon'>
                                    <FontAwesomeIcon
                                        icon={validConfirmPass ? faCheck : faTimes}
                                        color={validConfirmPass ? 'green' : 'red'}
                                    />
                                </span>
                            )}
                        </label>
                        <input
                            className='form-input'
                            type='password'
                            id='confirm-password'
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            onFocus={() => setConfirmFocus(true)}
                            onBlur={() => setConfirmFocus(false)}
                            required
                        />
                        {confirmFocus && !validConfirmPass && (
                            <p className="form-instructions">
                                <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon'/>
                                Passwords do not match.
                            </p>
                        )}


                        <button className={!validName || !validPass || !validConfirmPass ? 'form-submit' : 'form-submit-valid'} disabled={!validName || !validPass || !validConfirmPass ? true : false}>Register</button>
                        <p className='form-footer'>
                            Already registered? <br />
                            <span className='form-signin'>
                                <a href='#'>Sign In</a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    )
};

export default Register;
