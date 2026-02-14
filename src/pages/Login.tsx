import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, Building2, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('kancelaria');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateEmail = (value: string) => {
        if (!value.trim()) return 'Podaj adres email.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Podaj poprawny adres email.';
        return '';
    };

    const validatePassword = (value: string) => {
        if (!value) return 'Podaj hasło.';
        if (value.length < 8) return 'Hasło musi mieć minimum 8 znaków.';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const currentEmailError = validateEmail(email);
        const currentPasswordError = validatePassword(password);
        setEmailError(currentEmailError);
        setPasswordError(currentPasswordError);

        if (currentEmailError || currentPasswordError) {
            setError('Popraw błędy formularza i spróbuj ponownie.');
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password, role);
            if (role === 'klient') navigate('/klient');
            else if (role === 'kancelaria') navigate('/firma');
            else navigate('/admin');
        } catch {
            setError('Błąd logowania. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card animate-in">
                <div className="login-header">
                    <div className="login-logo"><Scale size={24} /></div>
                    <h1>Legal SaaS</h1>
                    <p>Zaloguj się do platformy</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error"><AlertCircle size={16} /><span>{error}</span></div>
                    )}

                    <div className="form-group">
                        <label>Typ konta</label>
                        <div className="login-role-selector" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <button
                                type="button"
                                className={`login-role-btn ${role === 'kancelaria' ? 'active' : ''}`}
                                onClick={() => setRole('kancelaria')}
                            >
                                <Building2 size={16} /> Firma
                            </button>
                            <button
                                type="button"
                                className={`login-role-btn ${role === 'klient' ? 'active' : ''}`}
                                onClick={() => setRole('klient')}
                            >
                                <UserCircle size={16} /> Klient
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                id="email"
                                type="email"
                                placeholder="admin@legal-saas.pl"
                                value={email}
                                onChange={e => {
                                    const value = e.target.value;
                                    setEmail(value);
                                    if (emailError) setEmailError(validateEmail(value));
                                }}
                                onBlur={() => setEmailError(validateEmail(email))}
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
                                onChange={e => {
                                    const value = e.target.value;
                                    setPassword(value);
                                    if (passwordError) setPasswordError(validatePassword(value));
                                }}
                                onBlur={() => setPasswordError(validatePassword(password))}
                                className={passwordError ? 'input-error' : ''}
                                required
                            />
                            <button
                                type="button"
                                className="input-action-btn"
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {passwordError && <span className="form-error-msg">{passwordError}</span>}
                    </div>

                    <div className="login-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Zapamiętaj mnie
                        </label>
                        <Link to="/reset-hasla" className="forgot-password">Zapomniałeś hasła?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                        {isLoading ? (<><Loader2 className="animate-spin" size={18} /> Logowanie...</>) : 'Zaloguj się'}
                    </button>
                </form>

                <div className="login-footer" style={{ marginTop: 24 }}>
                    <p style={{ marginBottom: 8 }}>Nie masz konta? <Link to="/rejestracja" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Zarejestruj się</Link></p>
                    <p style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>© 2026 Antigravity Legal. Wszystkie prawa zastrzeżone.</p>
                    <Link to="/admin-login" style={{ fontSize: 10, color: 'var(--text-tertiary)', opacity: 0.5, marginTop: 12, display: 'block' }}>Dostęp dla personelu</Link>
                </div>
            </div>

            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
        </div>
    );
}
