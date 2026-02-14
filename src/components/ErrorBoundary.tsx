import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <div style={{ maxWidth: '500px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            color: 'var(--danger)'
                        }}>
                            <AlertTriangle size={32} />
                        </div>
                        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Ups! Coś poszło nie tak</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
                            Wystąpił nieoczekiwany błąd w aplikacji. Próbujemy go automatycznie zarejestrować, a Ty możesz spróbować odświeżyć stronę.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <RefreshCw size={18} /> Odśwież stronę
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.location.href = '/'}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <Home size={18} /> Strona główna
                            </button>
                        </div>
                        {import.meta.env.DEV && (
                            <div style={{
                                marginTop: '40px',
                                padding: '16px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px',
                                textAlign: 'left',
                                fontSize: '12px',
                                overflowX: 'auto',
                                border: '1px solid var(--border-secondary)'
                            }}>
                                <code style={{ color: 'var(--danger)' }}>{this.state.error?.toString()}</code>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
