import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

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
    logout: () => Promise<void>;
    switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const roleDefaults: Record<UserRole, AuthUser> = {
    admin: { name: 'Jan Kowalski', email: 'jan@admin.pl', role: 'admin' },
    kancelaria: { name: 'mec. Robert Kamiński', email: 'robert@kancelaria-nowak.pl', role: 'kancelaria', firmName: 'Kancelaria Nowak' },
    klient: { name: 'Maria Zielińska', email: 'maria@email.pl', role: 'klient' },
};

const ACCESS_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';
const USER_KEY = 'auth_user';
const AUTH_MODE = import.meta.env.VITE_AUTH_MODE || 'mock';

const parseJwt = (token: string): Partial<AuthUser> | null => {
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return {
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            firmName: decoded.firmName,
        } as Partial<AuthUser>;
    } catch {
        return null;
    }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(USER_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
                return;
            } catch {
                /* ignore */
            }
        }

        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            const parsed = parseJwt(token);
            if (parsed?.role) {
                const u = {
                    name: parsed.name || 'Użytkownik',
                    email: parsed.email || '',
                    role: parsed.role as UserRole,
                    firmName: parsed.firmName,
                };
                setUser(u);
                localStorage.setItem(USER_KEY, JSON.stringify(u));
            }
        }
    }, []);

    const login = async (email: string, password: string, role: UserRole) => {
        if (AUTH_MODE === 'jwt') {
            const response = await authService.login({ email, password, role });
            const { accessToken, refreshToken, user: apiUser } = response.data || {};

            if (accessToken) {
                localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            }
            if (refreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            }

            const resolvedUser: AuthUser | null = apiUser
                ? { ...apiUser }
                : (() => {
                    const parsed = accessToken ? parseJwt(accessToken) : null;
                    if (!parsed?.role) return null;
                    return {
                        name: parsed.name || 'Użytkownik',
                        email: parsed.email || email,
                        role: parsed.role as UserRole,
                        firmName: parsed.firmName,
                    };
                })();

            if (!resolvedUser) throw new Error('Brak danych użytkownika z API.');

            setUser(resolvedUser);
            localStorage.setItem(USER_KEY, JSON.stringify(resolvedUser));
            localStorage.setItem('isAuthenticated', 'true');
            return;
        }

        // Mock login (fallback)
        await new Promise(r => setTimeout(r, 800));
        const u = { ...roleDefaults[role], email: email || roleDefaults[role].email };
        setUser(u);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = async () => {
        try {
            if (AUTH_MODE === 'jwt') {
                await authService.logout?.();
            }
        } finally {
            setUser(null);
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem('isAuthenticated');
        }
    };

    const switchRole = (role: UserRole) => {
        if (AUTH_MODE === 'jwt') return;
        const u = { ...roleDefaults[role] };
        setUser(u);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
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
