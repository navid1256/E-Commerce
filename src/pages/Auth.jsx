import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


export default function Auth() {
    const [mode, setMode] = useState('login');
    const [error, setError] = useState(null);
    const { signUp, login } = useAuth();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    function onSubmit(data) {
        let result;
        if (mode === 'signup') {
            result = signUp(data.email, data.password);
        } else {
            result = login(data.email, data.password);
        }

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }
    }
    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">{mode === 'signup' ? 'Sign Up' : 'Login'}</h1>
                    {error && <span className="form-error" role="alert">{error}</span>}
                    <form action="" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                {...register('email', { required: 'Email is required' })} />
                            {errors.email && <span className="form-error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password"
                                id="password"
                                name="password"
                                className="form-input"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters long' },
                                    maxLength: { value: 36, message: 'Password cannot exceed 36 characters' }
                                })} />
                            {errors.password && <span className="form-error">{errors.password.message}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-large">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>Already have an account? <button type="button" className="auth-link" onClick={() => setMode('login')}>Login</button></p>
                        ) : (
                            <p>Don't have an account? <button type="button" className="auth-link" onClick={() => setMode('signup')}>Sign Up</button></p>
                        )}

                    </div>


                </div>

            </div>

        </div >
    );
}