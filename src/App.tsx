import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// --- Admin pages ---
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UsersPage = lazy(() => import('./pages/Users'));
const RolesPage = lazy(() => import('./pages/Roles'));
const LawFirmsPage = lazy(() => import('./pages/LawFirms'));
const LawyersPage = lazy(() => import('./pages/Lawyers'));
const CasesPage = lazy(() => import('./pages/Cases'));
const DocumentsPage = lazy(() => import('./pages/Documents'));
const PaymentsPage = lazy(() => import('./pages/Payments'));
const InvoicesPage = lazy(() => import('./pages/Invoices'));
const PlansPage = lazy(() => import('./pages/Plans'));
const PromotionsPage = lazy(() => import('./pages/Promotions'));
const AICenterPage = lazy(() => import('./pages/AICenter'));
const LegalKnowledgePage = lazy(() => import('./pages/LegalKnowledge'));
const AnalyticsPage = lazy(() => import('./pages/Analytics'));
const AuditLogPage = lazy(() => import('./pages/AuditLog'));
const SecurityPage = lazy(() => import('./pages/Security'));
const SystemConfigPage = lazy(() => import('./pages/SystemConfig'));
const BackupsPage = lazy(() => import('./pages/Backups'));
const SystemLogsPage = lazy(() => import('./pages/SystemLogs'));
const CookiesPage = lazy(() => import('./pages/Cookies'));
const SupportPage = lazy(() => import('./pages/Support'));
const CMSPage = lazy(() => import('./pages/CMS'));

// --- Client pages ---
const ClientLayout = lazy(() => import('./components/ClientLayout'));
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'));
const NewCase = lazy(() => import('./pages/client/NewCase'));
const ClientCases = lazy(() => import('./pages/client/ClientCases'));
const ClientChat = lazy(() => import('./pages/client/ClientChat'));
const ClientPayments = lazy(() => import('./pages/client/ClientPayments'));

// --- Firm pages ---
const FirmLayout = lazy(() => import('./components/FirmLayout'));
const FirmDashboard = lazy(() => import('./pages/firm/FirmDashboard'));
const FirmCases = lazy(() => import('./pages/firm/FirmCases'));
const FirmLawyers = lazy(() => import('./pages/firm/FirmLawyers'));
const FirmAIGenerator = lazy(() => import('./pages/firm/FirmAIGenerator'));
const FirmTemplates = lazy(() => import('./pages/firm/FirmTemplates'));
const FirmInvoices = lazy(() => import('./pages/firm/FirmInvoices'));
const FirmCalendar = lazy(() => import('./pages/firm/FirmCalendar'));

// --- Public pages ---
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'));
const AdminLoginPage = lazy(() => import('./pages/AdminLogin'));
const AdminRegisterPage = lazy(() => import('./pages/AdminRegister'));

const PageLoader = () => (
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        <div className="spin" style={{ margin: '0 auto 20px', width: '32px', height: '32px', border: '2px solid var(--border-secondary)', borderTopColor: 'var(--accent)', borderRadius: '50%' }}></div>
        Ładowanie modułu...
    </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

const RoleRedirect = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    switch (user.role) {
        case 'admin': return <Navigate to="/admin" replace />;
        case 'kancelaria': return <Navigate to="/firma" replace />;
        case 'klient': return <Navigate to="/klient" replace />;
        default: return <Navigate to="/login" replace />;
    }
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/rejestracja" element={<RegisterPage />} />
            <Route path="/reset-hasla" element={<ResetPasswordPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/admin-register" element={<AdminRegisterPage />} />

            {/* Root → redirect by role */}
            <Route path="/" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />

            {/* Admin panel */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/roles" element={<RolesPage />} />
                <Route path="/admin/law-firms" element={<LawFirmsPage />} />
                <Route path="/admin/lawyers" element={<LawyersPage />} />
                <Route path="/admin/cases" element={<CasesPage />} />
                <Route path="/admin/documents" element={<DocumentsPage />} />
                <Route path="/admin/payments" element={<PaymentsPage />} />
                <Route path="/admin/invoices" element={<InvoicesPage />} />
                <Route path="/admin/plans" element={<PlansPage />} />
                <Route path="/admin/promotions" element={<PromotionsPage />} />
                <Route path="/admin/ai-center" element={<AICenterPage />} />
                <Route path="/admin/legal-knowledge" element={<LegalKnowledgePage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
                <Route path="/admin/audit-log" element={<AuditLogPage />} />
                <Route path="/admin/security" element={<SecurityPage />} />
                <Route path="/admin/config" element={<SystemConfigPage />} />
                <Route path="/admin/backups" element={<BackupsPage />} />
                <Route path="/admin/logs" element={<SystemLogsPage />} />
                <Route path="/admin/cookies" element={<CookiesPage />} />
                <Route path="/admin/support" element={<SupportPage />} />
                <Route path="/admin/cms" element={<CMSPage />} />
            </Route>

            {/* Client panel */}
            <Route element={<ProtectedRoute><ClientLayout /></ProtectedRoute>}>
                <Route path="/klient" element={<ClientDashboard />} />
                <Route path="/klient/nowa-sprawa" element={<NewCase />} />
                <Route path="/klient/sprawy" element={<ClientCases />} />
                <Route path="/klient/wiadomosci" element={<ClientChat />} />
                <Route path="/klient/platnosci" element={<ClientPayments />} />
            </Route>

            {/* Firm panel */}
            <Route element={<ProtectedRoute><FirmLayout /></ProtectedRoute>}>
                <Route path="/firma" element={<FirmDashboard />} />
                <Route path="/firma/sprawy" element={<FirmCases />} />
                <Route path="/firma/prawnicy" element={<FirmLawyers />} />
                <Route path="/firma/generator-ai" element={<FirmAIGenerator />} />
                <Route path="/firma/szablony" element={<FirmTemplates />} />
                <Route path="/firma/faktury" element={<FirmInvoices />} />
                <Route path="/firma/kalendarz" element={<FirmCalendar />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Suspense fallback={<PageLoader />}>
                    <AppRoutes />
                </Suspense>
            </AuthProvider>
        </BrowserRouter>
    );
}
