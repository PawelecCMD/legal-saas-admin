import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Mail, Lock, User, AlertCircle, Loader2, Check, ArrowRight, ArrowLeft, Phone, Eye, EyeOff, Building2, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';
import { getPasswordStrength } from '../utils/passwordStrength';

export default function Register() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        password: '', confirmPassword: '',
    });
    const [role, setRole] = useState<UserRole>('klient');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

    const validateEmail = (value: string) => {
        const email = value.trim();
        if (!email) return 'Email jest wymagany.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? '' : 'Podaj poprawny adres email.';
    };

    const validateStep2 = () => {
        const errors: Record<string, string> = {};

        const emailError = validateEmail(formData.email);
        if (emailError) errors.email = emailError;

        if (!formData.password) errors.password = 'Hasło jest wymagane.';
        else if (formData.password.length < 8) errors.password = 'Hasło musi mieć minimum 8 znaków.';
        else if (!/[A-Z]/.test(formData.password) || !/\d/.test(formData.password)) {
            errors.password = 'Hasło musi zawierać minimum 1 wielką literę i 1 cyfrę.';
        }

        if (!formData.confirmPassword) errors.confirmPassword = 'Powtórz hasło.';
        else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Hasła nie są identyczne.';

        return errors;
    };

    const validateStep3 = () => {
        const errors: Record<string, string> = {};

        if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
            errors.firstName = 'Podaj poprawne imię (min. 2 znaki).';
        }
        if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
            errors.lastName = 'Podaj poprawne nazwisko (min. 2 znaki).';
        }

        if (formData.phone.trim() && !/^\+?[0-9\s-]{9,15}$/.test(formData.phone.trim())) {
            errors.phone = 'Podaj poprawny numer telefonu.';
        }

        return errors;
    };

    const goNext = () => {
        setError('');
        if (step === 2) {
            const stepErrors = validateStep2();
            setFieldErrors(prev => ({ ...prev, ...stepErrors }));
            if (Object.keys(stepErrors).length > 0) {
                setError('Popraw pola logowania przed przejściem dalej.');
                return;
            }
        }
        if (step === 3) {
            const stepErrors = validateStep3();
            setFieldErrors(prev => ({ ...prev, ...stepErrors }));
            if (Object.keys(stepErrors).length > 0) {
                setError('Popraw dane osobowe przed przejściem dalej.');
                return;
            }
        }
        setDirection('next');
        setStep(s => Math.min(4, s + 1));
        setError('');
    };

    const goBack = () => {
        setDirection('prev');
        setStep(s => Math.max(1, s - 1));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const step2Errors = validateStep2();
        const step3Errors = validateStep3();
        const nextErrors = { ...step2Errors, ...step3Errors };
        setFieldErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setError('Popraw błędy formularza i spróbuj ponownie.');
            return;
        }
        if (!acceptedTerms) {
            setError('Zaakceptuj regulamin i politykę prywatności.');
            return;
        }

        setIsLoading(true);
        try {
            await login(formData.email, formData.password, role);
            setSuccess(true);
            setTimeout(() => {
                if (role === 'klient') navigate('/klient');
                else if (role === 'kancelaria') navigate('/firma');
                else navigate('/admin');
            }, 2000);
        } catch {
            setError('Błąd rejestracji. Spróbuj ponownie.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="login-container">
                <div className="login-card animate-in" style={{ textAlign: 'center', padding: '48px 40px' }}>
                    <div className="auth-success-icon">
                        <Check size={32} color="white" />
                    </div>
                    <h2 style={{ marginTop: 20, marginBottom: 8 }}>Konto utworzone!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                        Witaj, {formData.firstName}! Przekierowanie do panelu...
                    </p>
                    <div className="badge badge-success" style={{ fontSize: 13, padding: '6px 16px' }}>
                        Trwa przekierowanie...
                    </div>
                </div>
                <div className="login-background"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
            </div>
        );
    }

    const roleColor = '#6366f1';
    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="login-container">
            <div className="login-card animate-in" style={{ maxWidth: 480 }}>
                <div className="login-header">
                    <div className="login-logo"><Scale size={24} /></div>
                    <h1>Rejestracja</h1>
                    <p>Utwórz konto na platformie Legal SaaS</p>
                </div>

                {/* Progress Steps */}
                <div className="auth-steps">
                    {[
                        { n: 1, label: 'Typ' },
                        { n: 2, label: 'Logowanie' },
                        { n: 3, label: 'Dane' },
                        { n: 4, label: 'Potwierdzenie' },
                    ].map((s, i) => (
                        <React.Fragment key={s.n}>
                            {i > 0 && <div className={`auth-step-line${step > s.n - 1 ? ' filled' : ''}`} />}
                            <div className={`auth-step-circle${step >= s.n ? ' active' : ''}${step > s.n ? ' done' : ''}`}
                                style={step >= s.n ? { borderColor: roleColor, background: step > s.n ? roleColor : 'transparent', color: step > s.n ? 'white' : roleColor } : {}}>
                                {step > s.n ? <Check size={14} /> : s.n}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="auth-step-labels" style={{ transform: 'translateX(-5px)' }}>
                    <span className={step >= 1 ? 'active' : ''}>Typ</span>
                    <span className={step >= 2 ? 'active' : ''}>Logowanie</span>
                    <span className={step >= 3 ? 'active' : ''}>Dane</span>
                    <span className={step >= 4 ? 'active' : ''}>Koniec</span>
                </div>

                <form onSubmit={handleSubmit} className="register-auth-form">
                    {error && (
                        <div className="login-error animate-in"><AlertCircle size={16} /><span>{error}</span></div>
                    )}

                    <div className="auth-form-wrapper" style={{ minHeight: step === 1 ? 260 : step === 2 ? 320 : 240 }}>
                        {/* Step 1: Role Selection */}
                        <div className={`auth-form-step${step === 1 ? ' active' : ''}${step > 1 ? ' exit-left' : ''}`}
                            data-direction={direction}>
                            <h3 className="auth-form-title auth-form-title-spaced">Wybierz typ konta</h3>
                            <div className="auth-role-selection">
                                <button
                                    type="button"
                                    className={`role-option ${role === 'klient' ? 'active' : ''}`}
                                    onClick={() => setRole('klient')}
                                >
                                    <div className="role-icon"><UserCircle size={28} /></div>
                                    <div className="role-info">
                                        <strong>Petent (Klient)</strong>
                                        <span>Chcę zlecić sprawę i śledzić jej postępy</span>
                                    </div>
                                    <div className="role-check"><Check size={16} /></div>
                                </button>
                                <button
                                    type="button"
                                    className={`role-option ${role === 'kancelaria' ? 'active' : ''}`}
                                    onClick={() => setRole('kancelaria')}
                                >
                                    <div className="role-icon"><Building2 size={28} /></div>
                                    <div className="role-info">
                                        <strong>Kancelaria</strong>
                                        <span>Chcę zarządzać sprawami i klientami</span>
                                    </div>
                                    <div className="role-check"><Check size={16} /></div>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Login Data */}
                        <div className={`auth-form-step${step === 2 ? ' active' : ''}${step > 2 ? ' exit-left' : ''}${step < 2 ? ' exit-right' : ''}`}
                            data-direction={direction}>
                            <h3 className="auth-form-title auth-form-title-spaced">Dane logowania</h3>
                            <div className="auth-login-fields">
                                <div className="form-group">
                                    <label>Email</label>
                                    <div className="input-with-icon">
                                        <Mail size={18} />
                                        <input
                                            type="email"
                                            placeholder="twoj@email.pl"
                                            value={formData.email}
                                            onChange={e => {
                                                update('email', e.target.value);
                                                if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                                            }}
                                            onBlur={() => setFieldErrors(prev => ({ ...prev, email: validateEmail(formData.email) }))}
                                            className={fieldErrors.email ? 'input-error' : ''}
                                        />
                                    </div>
                                    {fieldErrors.email && <span className="form-error-msg">{fieldErrors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Hasło</label>
                                    <div className="input-with-icon">
                                        <Lock size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Min. 8 znaków"
                                            value={formData.password}
                                            onChange={e => {
                                                update('password', e.target.value);
                                                if (fieldErrors.password) {
                                                    setFieldErrors(prev => ({ ...prev, ...validateStep2() }));
                                                }
                                            }}
                                            className={fieldErrors.password ? 'input-error' : ''}
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
                                    {fieldErrors.password && <span className="form-error-msg">{fieldErrors.password}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Powtórz hasło</label>
                                    <div className="input-with-icon">
                                        <Lock size={18} />
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Powtórz hasło"
                                            value={formData.confirmPassword}
                                            onChange={e => {
                                                update('confirmPassword', e.target.value);
                                                if (fieldErrors.confirmPassword) {
                                                    setFieldErrors(prev => ({ ...prev, ...validateStep2() }));
                                                }
                                            }}
                                            className={fieldErrors.confirmPassword ? 'input-error' : ''}
                                        />
                                        <button
                                            type="button"
                                            className="input-action-btn"
                                            onClick={() => setShowConfirmPassword(prev => !prev)}
                                            aria-label={showConfirmPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    {fieldErrors.confirmPassword && <span className="form-error-msg">{fieldErrors.confirmPassword}</span>}
                                </div>
                            </div>
                            {formData.password.length > 0 && (
                                <div className="auth-password-strength animate-in">
                                    <div className="auth-strength-bar">
                                        <div className="auth-strength-fill" style={{
                                            width: `${passwordStrength.width}%`,
                                            background: passwordStrength.color,
                                        }} />
                                    </div>
                                    <span style={{ fontSize: 11, color: passwordStrength.color }}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className={`auth-form-step${step === 3 ? ' active' : ''}${step < 3 ? ' exit-right' : ''}${step > 3 ? ' exit-left' : ''}`}
                            data-direction={direction}>
                            <h3 className="auth-form-title auth-form-title-spaced">Dane osobowe</h3>
                            <div className="register-personal-fields">
                                <div className="form-group">
                                    <label>Imię</label>
                                    <div className="input-with-icon">
                                        <User size={18} />
                                        <input placeholder="Jan" value={formData.firstName}
                                            onChange={e => {
                                                update('firstName', e.target.value);
                                                if (fieldErrors.firstName) {
                                                    setFieldErrors(prev => ({ ...prev, firstName: '' }));
                                                }
                                            }}
                                            className={fieldErrors.firstName ? 'input-error' : ''}
                                        />
                                    </div>
                                    {fieldErrors.firstName && <span className="form-error-msg">{fieldErrors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Nazwisko</label>
                                    <div className="input-with-icon">
                                        <User size={18} />
                                        <input placeholder="Kowalski" value={formData.lastName}
                                            onChange={e => {
                                                update('lastName', e.target.value);
                                                if (fieldErrors.lastName) {
                                                    setFieldErrors(prev => ({ ...prev, lastName: '' }));
                                                }
                                            }}
                                            className={fieldErrors.lastName ? 'input-error' : ''}
                                        />
                                    </div>
                                    {fieldErrors.lastName && <span className="form-error-msg">{fieldErrors.lastName}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Telefon <span style={{ color: 'var(--text-tertiary)', fontSize: 11 }}>(opcjonalnie)</span></label>
                                    <div className="input-with-icon">
                                        <Phone size={18} />
                                        <input type="tel" placeholder="+48 600 000 000" value={formData.phone}
                                            onChange={e => {
                                                update('phone', e.target.value);
                                                if (fieldErrors.phone) {
                                                    setFieldErrors(prev => ({ ...prev, phone: '' }));
                                                }
                                            }}
                                            className={fieldErrors.phone ? 'input-error' : ''}
                                        />
                                    </div>
                                    {fieldErrors.phone && <span className="form-error-msg">{fieldErrors.phone}</span>}
                                </div>
                            </div>

                        </div>

                        <div className={`auth-form-step auth-confirm-step${step === 4 ? ' active' : ''}${step < 4 ? ' exit-right' : ''}`}
                            data-direction={direction}>
                            <h3 className="auth-form-title">Potwierdzenie</h3>
                            <p className="auth-confirm-desc">
                                Sprawdź dane i zaakceptuj wymagane zgody.
                            </p>
                            <label className="checkbox-container auth-confirm-checkbox">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={e => setAcceptedTerms(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                Akceptuję <a href="#" style={{ color: 'var(--accent-light)' }}>regulamin</a> i <a href="#" style={{ color: 'var(--accent-light)' }}>politykę prywatności</a>
                            </label>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="auth-nav-buttons">
                        {step > 1 ? (
                            <button type="button" className="btn btn-secondary" onClick={goBack}>
                                <ArrowLeft size={16} /> Wstecz
                            </button>
                        ) : <div />}
                        {step < 4 ? (
                            <button type="button" className="btn btn-primary" onClick={goNext}
                                style={{ background: roleColor }}>
                                Dalej <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-primary" disabled={isLoading}
                                style={{ background: roleColor }}>
                                {isLoading ? (<><Loader2 className="animate-spin" size={16} /> Tworzenie konta...</>) :
                                    (<><Check size={16} /> Utwórz konto</>)}
                            </button>
                        )}
                    </div>
                </form>

                <div className="login-footer" style={{ marginTop: 24 }}>
                    <div className="flex flex-col gap-2 items-center">
                        <p>Masz już konto? <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Zaloguj się</Link></p>
                        <Link to="/reset-hasla" className="forgot-password text-xs">Zapomniałeś hasła?</Link>
                    </div>
                </div>
            </div>

            <div className="login-background"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
        </div>
    );
}
