import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        password: '', confirmPassword: '',
        adminCode: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne.');
            return;
        }

        if (formData.adminCode !== 'ADMIN2026') {
            setError('Nieprawidłowy kod autoryzacji administratora.');
            return;
        }

        setIsLoading(true);
        try {
            await login(formData.email, formData.password, 'admin');
            setSuccess(true);
            setTimeout(() => navigate('/admin'), 2000);
        } catch {
            setError('Błąd tworzenia konta admina.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="login-container admin-theme">
                <div className="login-card animate-in text-center p-12">
                    <div className="auth-success-icon bg-red-500"><Check size={32} color="white" /></div>
                    <h2 className="mt-5 mb-2">Admin zarejestrowany!</h2>
                    <p className="text-var(--text-secondary)">Przekierowanie do panelu zarządzania...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container admin-theme">
            <div className="login-card animate-in border-t-4 border-red-500" style={{ maxWidth: 440 }}>
                <div className="login-header">
                    <div className="login-logo bg-red-500/10 text-red-500"><ShieldAlert size={24} /></div>
                    <h1>Rejestracja Admina</h1>
                    <p>Utwórz nowe konto personelu</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error"><AlertCircle size={16} /><span>{error}</span></div>
                    )}

                    <div className="form-group">
                        <label>Email Służbowy</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input type="email" placeholder="admin@legal-saas.pl" value={formData.email} onChange={e => update('email', e.target.value)} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label>Imię</label>
                            <input className="w-full" placeholder="Jan" value={formData.firstName} onChange={e => update('firstName', e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Nazwisko</label>
                            <input className="w-full" placeholder="Kowalski" value={formData.lastName} onChange={e => update('lastName', e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Hasło</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input type="password" placeholder="••••••••" value={formData.password} onChange={e => update('password', e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Kod Autoryzacji Admina</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input type="password" placeholder="Wprowadź kod systemowy" value={formData.adminCode} onChange={e => update('adminCode', e.target.value)} required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn bg-red-600 hover:bg-red-700" disabled={isLoading}>
                        {isLoading ? 'Tworzenie...' : 'Zarejestruj Administratora'}
                    </button>
                    
                    <div className="text-center mt-4 flex flex-col gap-2 scale-90">
                        <Link to="/admin-login" className="text-xs text-var(--text-tertiary) hover:text-red-400">Masz już konto? Zaloguj się</Link>
                        <Link to="/reset-hasla" className="text-xs text-var(--text-tertiary) hover:text-red-400">Zapomniałeś hasła?</Link>
                    </div>
                </form>
            </div>
            <div className="login-background"><div className="blob blob-1 bg-red-500/10"></div></div>
        </div>
    );
}
