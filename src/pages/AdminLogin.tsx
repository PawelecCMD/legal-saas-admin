import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (value: string) => {
        if (!value.trim()) return 'Podaj adres email administratora.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Podaj poprawny adres email.';
        return '';
    };

    const validatePassword = (value: string) => {
        if (!value) return 'Podaj hasło.';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const currentEmailError = validateEmail(email);
        const currentPasswordError = validatePassword(password);
        setEmailError(currentEmailError);
        setPasswordError(currentPasswordError);

        if (currentEmailError || currentPasswordError) return;

        setIsLoading(true);
        try {
            await login(email, password, 'admin');
            navigate('/admin');
        } catch {
            setError('Nieprawidłowe dane logowania administratora.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container admin-theme">
            <div className="login-card animate-in border-t-4 border-red-500">
                <div className="login-header">
                    <div className="login-logo bg-red-500/10 text-red-500"><ShieldCheck size={24} /></div>
                    <h1>Panel Administracyjny</h1>
                    <p>Logowanie dla personelu technicznego</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error"><AlertCircle size={16} /><span>{error}</span></div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Admina</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@legal-saas.pl"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={emailError ? 'input-error' : ''}
                                required
                            />
                        </div>
                        {emailError && <span className="form-error-msg">{emailError}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className={passwordError ? 'input-error' : ''}
                                required
                            />
                            <button
                                type="button"
                                className="input-action-btn"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {passwordError && <span className="form-error-msg">{passwordError}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary login-btn bg-red-600 hover:bg-red-700 border-none" disabled={isLoading}>
                        {isLoading ? (<><Loader2 className="animate-spin" size={18} /> Autoryzacja...</>) : 'Zaloguj jako Admin'}
                    </button>
                    
                    <div className="text-center mt-3">
                        <Link to="/reset-hasla" className="forgot-password text-xs opacity-70 hover:opacity-100">Zapomniałeś hasła?</Link>
                    </div>
                </form>

                <div className="login-footer">
                    <div className="flex flex-col gap-2 items-center">
                        <p>Nie masz konta personelu? <Link to="/admin-register" style={{ color: 'var(--accent-light)' }}>Zarejestruj się</Link></p>
                        <p>Powrót do <Link to="/login" style={{ color: 'var(--accent-light)' }}>Logowania Standardowego</Link></p>
                    </div>
                </div>
            </div>
            <div className="login-background"><div className="blob blob-1 bg-red-500/20"></div><div className="blob blob-2 bg-red-800/20"></div></div>
        </div>
    );
}
