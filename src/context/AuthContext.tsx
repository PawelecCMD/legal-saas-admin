import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'kancelaria' | 'klient';

interface AuthUser {
    name: string;
    email: string;
    role: UserRole;
    firmName?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
    switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const roleDefaults: Record<UserRole, AuthUser> = {
    admin: { name: 'Jan Kowalski', email: 'jan@admin.pl', role: 'admin' },
    kancelaria: { name: 'mec. Robert Kamiński', email: 'robert@kancelaria-nowak.pl', role: 'kancelaria', firmName: 'Kancelaria Nowak' },
    klient: { name: 'Maria Zielińska', email: 'maria@email.pl', role: 'klient' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('auth_user');
        if (stored) {
            try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
        }
    }, []);

    const login = async (email: string, _password: string, role: UserRole) => {
        // Simulated login
        await new Promise(r => setTimeout(r, 800));
        const u = { ...roleDefaults[role], email: email || roleDefaults[role].email };
        setUser(u);
        localStorage.setItem('auth_user', JSON.stringify(u));
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('isAuthenticated');
    };

    const switchRole = (role: UserRole) => {
        const u = { ...roleDefaults[role] };
        setUser(u);
        localStorage.setItem('auth_user', JSON.stringify(u));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
