import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, Lock, AlertCircle, Loader2, Check, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';

import { getPasswordStrength } from '../utils/passwordStrength';

type ResetStep = 'email' | 'code' | 'newpass' | 'done';

export default function ResetPassword() {
    const [step, setStep] = useState<ResetStep>('email');
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const passwordStrength = getPasswordStrength(password);

    const stepOrder: ResetStep[] = ['email', 'code', 'newpass', 'done'];
    const stepIndex = stepOrder.indexOf(step);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email) { setError('Podaj adres email.'); return; }
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsLoading(false);
        setDirection('next');
        setStep('code');
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const fullCode = code.join('');
        if (fullCode.length < 6) { setError('Wpisz pełny kod weryfikacyjny.'); return; }
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setIsLoading(false);
        setDirection('next');
        setStep('newpass');
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < 8) { setError('Hasło musi mieć min. 8 znaków.'); return; }
        if (password !== confirmPassword) { setError('Hasła nie są identyczne.'); return; }
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsLoading(false);
        setDirection('next');
        setStep('done');
    };

    const handleCodeInput = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1);
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
            const next = document.getElementById(`code-${index + 1}`);
            next?.focus();
        }
    };

    const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prev = document.getElementById(`code-${index - 1}`);
            prev?.focus();
        }
    };

    const goBack = () => {
        setDirection('prev');
        setError('');
        if (step === 'code') setStep('email');
        else if (step === 'newpass') setStep('code');
    };

    return (
        <div className="login-container">
            <div className="login-card animate-in">
                <div className="login-header">
                    <div className="login-logo"><Scale size={24} /></div>
                    <h1>Resetowanie hasła</h1>
                    <p>Odzyskaj dostęp do swojego konta</p>
                </div>

                {/* Progress */}
                {step !== 'done' && (
                    <div className="auth-steps" style={{ marginBottom: 8 }}>
                        {['Email', 'Kod', 'Nowe hasło'].map((label, i) => (
                            <React.Fragment key={label}>
                                {i > 0 && <div className={`auth-step-line${stepIndex > i ? ' filled' : ''}`} />}
                                <div className={`auth-step-circle${stepIndex >= i ? ' active' : ''}${stepIndex > i ? ' done' : ''}`}
                                    style={stepIndex >= i ? { borderColor: '#6366f1', background: stepIndex > i ? '#6366f1' : 'transparent', color: stepIndex > i ? 'white' : '#6366f1' } : {}}>
                                    {stepIndex > i ? <Check size={14} /> : i + 1}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {error && <div className="login-error animate-in"><AlertCircle size={16} /><span>{error}</span></div>}

                <div className="auth-form-wrapper reset-form-wrapper">
                    {/* Step 1: Email */}
                    <div className={`auth-form-step${step === 'email' ? ' active' : ''}${stepIndex > 0 ? ' exit-left' : ''}`}
                        data-direction={direction}>
                        <form onSubmit={handleSendCode} className="login-form reset-step-form">
                            <div className="reset-step-intro reset-email-intro">
                                <div className="auth-reset-icon reset-mail-icon"><Mail size={24} /></div>
                                <p className="reset-step-desc">
                                    Podaj adres email powiązany z Twoim kontem. Wyślemy kod weryfikacyjny.
                                </p>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <div className="input-with-icon">
                                    <Mail size={18} />
                                    <input type="email" placeholder="twoj@email.pl" value={email}
                                        onChange={e => setEmail(e.target.value)} autoFocus />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="animate-spin" size={16} /> Wysyłanie...</>) :
                                    'Wyślij kod weryfikacyjny'}
                            </button>
                        </form>
                    </div>

                    {/* Step 2: OTP Code */}
                    <div className={`auth-form-step${step === 'code' ? ' active' : ''}${step === 'email' ? ' exit-right' : ''}${stepIndex > 1 ? ' exit-left' : ''}`}
                        data-direction={direction}>
                        <form onSubmit={handleVerifyCode} className="login-form reset-step-form">
                            <div className="reset-step-intro">
                                <div className="auth-reset-icon"><KeyRound size={24} /></div>
                                <p className="reset-step-desc">
                                    Wpisz 6-cyfrowy kod wysłany na <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                                </p>
                            </div>
                            <div className="form-group">
                                <label>Kod weryfikacyjny</label>
                                <div className="auth-code-inputs">
                                    {code.map((digit, i) => (
                                        <input key={i} id={`code-${i}`} type="text" inputMode="numeric"
                                            maxLength={1} value={digit} autoFocus={i === 0}
                                            onChange={e => handleCodeInput(i, e.target.value)}
                                            onKeyDown={e => handleCodeKeyDown(i, e)}
                                            className="auth-code-input" />
                                    ))}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="animate-spin" size={16} /> Weryfikacja...</>) :
                                    'Zweryfikuj kod'}
                            </button>
                            <div className="reset-actions-row">
                                <button type="button" className="btn btn-ghost btn-sm" onClick={goBack}>
                                    <ArrowLeft size={14} /> Zmień email
                                </button>
                                <span className="reset-actions-separator">•</span>
                                <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setCode(['', '', '', '', '', '']); }}>
                                    Wyślij ponownie
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Step 3: New Password */}
                    <div className={`auth-form-step${step === 'newpass' ? ' active' : ''}${stepIndex < 2 ? ' exit-right' : ''}`}
                        data-direction={direction}>
                        <form onSubmit={handleResetPassword} className="login-form reset-step-form">
                            <div className="reset-step-intro">
                                <div className="auth-reset-icon"><ShieldCheck size={24} /></div>
                                <p className="reset-step-desc">
                                    Ustaw nowe hasło dla swojego konta.
                                </p>
                            </div>
                            <div className="form-group">
                                <label>Nowe hasło</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input type="password" placeholder="Min. 8 znaków" value={password}
                                        onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Powtórz nowe hasło</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input type="password" placeholder="Powtórz hasło" value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)} />
                                </div>
                            </div>
                            {password.length > 0 && (
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
                            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                                {isLoading ? (<><Loader2 className="animate-spin" size={16} /> Zapisywanie...</>) :
                                    (<><Check size={16} /> Ustaw nowe hasło</>)}
                            </button>
                            <div className="reset-actions-row">
                                <button type="button" className="btn btn-ghost btn-sm" onClick={goBack}>
                                    <ArrowLeft size={14} /> Wróć
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Step 4: Success */}
                    <div className={`auth-form-step${step === 'done' ? ' active' : ''}${stepIndex < 3 ? ' exit-right' : ''}`}
                        data-direction={direction}>
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div className="auth-success-icon">
                                <Check size={32} color="white" />
                            </div>
                            <h2 style={{ marginTop: 20, marginBottom: 8 }}>Hasło zmienione!</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
                                Twoje hasło zostało pomyślnie zmienione.<br />Możesz teraz zalogować się nowym hasłem.
                            </p>
                            <Link to="/login" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Przejdź do logowania
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="login-footer" style={{ marginTop: 16 }}>
                    <p>Pamiętasz hasło? <Link to="/login" style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Zaloguj się</Link></p>
                </div>
            </div>

            <div className="login-background"><div className="blob blob-1"></div><div className="blob blob-2"></div></div>
        </div>
    );
}
