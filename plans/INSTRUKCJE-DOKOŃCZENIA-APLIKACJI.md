# 📋 INSTRUKCJE DOKOŃCZENIA APLIKACJI LEGAL SAAS ADMIN

**Projekt:** Legal SaaS Admin Panel - End to End  
**Wersja:** 1.0  
**Data:** 14 lutego 2026  
**Status:** W trakcie rozwoju → Przygotowanie do produkcji

---

## 📚 SPIS TREŚCI

1. [Przegląd Projektu](#1-przegląd-projektu)
2. [Architektura Aplikacji](#2-architektura-aplikacji)
3. [Tech Stack](#3-tech-stack)
4. [Struktura Projektu](#4-struktura-projektu)
5. [Stan Aktualny](#5-stan-aktualny)
6. [Główne Problemy do Rozwiązania](#6-główne-problemy-do-rozwiązania)
7. [Plan Działania - Priorytetowy](#7-plan-działania---priorytetowy)
8. [Standardy Kodowania](#8-standardy-kodowania)
9. [Integracja Backend](#9-integracja-backend)
10. [Checklist Produkcyjny](#10-checklist-produkcyjny)
11. [Deployment](#11-deployment)
12. [Dokumentacja Techniczna](#12-dokumentacja-techniczna)

---

## 1. PRZEGLĄD PROJEKTU

### 1.1 Cel Aplikacji

**Legal SaaS Admin Panel** to kompleksowa platforma SaaS do zarządzania kancelariami prawnymi, obejmująca:

- **Panel Administratora** - zarządzanie systemem, kancelariami, prawnikami, płatnościami
- **Panel Kancelarii** - zarządzanie sprawami, prawnikami, szablonami dokumentów, AI
- **Panel Klienta** - przeglądanie spraw, komunikacja z prawnikami, płatności

### 1.2 Główne Funkcjonalności

#### Panel Administratora (Super Admin)
- Dashboard z kluczowymi metrykami (MRR, konwersja, zużycie AI)
- Zarządzanie użytkownikami i rolami
- Zarządzanie kancelariami (status, plany, limity)
- Zarządzanie prawnikami
- Monitoring spraw i dokumentów
- System płatności i escrow
- Faktury i integracja KSeF
- Plany subskrypcyjne i promocje
- Centrum AI (RAG, generowanie dokumentów)
- Baza wiedzy prawnej
- Analityka i raporty
- Dziennik audytu (audit log)
- Bezpieczeństwo (2FA, sesje)
- Konfiguracja systemu
- Kopie zapasowe
- Logi systemowe
- Zarządzanie cookies
- Wsparcie techniczne (ticketing)
- CMS i marketing

#### Panel Kancelarii (Law Firm)
- Dashboard kancelarii
- Zarządzanie sprawami (Kanban board)
- Zarządzanie prawnikami
- Generator AI dokumentów
- Szablony dokumentów
- Faktury
- Kalendarz terminów

#### Panel Klienta (Client)
- Dashboard klienta
- Tworzenie nowej sprawy
- Przeglądanie spraw
- Czat z prawnikami
- Płatności

#### Strony Publiczne
- Landing page
- Logowanie/Rejestracja
- Reset hasła
- Admin login/register

### 1.3 Model Biznesowy

- **SaaS B2B** - kancelarie prawne jako główni klienci
- **Subskrypcja** - plany: Basic, Professional, Enterprise, Pay-per-use
- **Escrow payments** - bezpieczne płatności między klientami a kancelariami
- **AI usage limits** - monetyzacja AI (GPT-4, RAG)
- **Trial period** - 14 dni dla Basic i Professional

---

## 2. ARCHITEKTURA APLIKACJI

### 2.1 Architektura Frontend

```
┌─────────────────────────────────────────────────┐
│                   React SPA                      │
│  ┌───────────────────────────────────────────┐  │
│  │        React Router (v7.13.0)             │  │
│  │  ┌─────────────┬──────────┬────────────┐  │  │
│  │  │   Public    │  Admin   │ Firm/Client│  │  │
│  │  │   Routes    │  Routes  │  Routes    │  │  │
│  │  └─────────────┴──────────┴────────────┘  │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │          AuthContext (Global)             │  │
│  │   - User state                            │  │
│  │   - Role-based redirect                   │  │
│  │   - Login/Logout                          │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │              UI Components                │  │
│  │   Layout, Sidebar, ClientLayout,         │  │
│  │   FirmLayout, ErrorBoundary               │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │         Custom Hooks                      │  │
│  │   useMediaQuery, useAutoSave,            │  │
│  │   useGlobalSearch                         │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │           Services (API)                  │  │
│  │   Axios + Interceptors                   │  │
│  │   authService, caseService, aiService    │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────────────────────────────────┐  │
│  │            Mock Data (Dev)                │  │
│  │   mockData.ts, ragKnowledge.ts           │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 2.2 Routing Structure

```typescript
// Routing hierarchy
/                          → RoleRedirect (admin/firma/klient)
/landing                   → LandingPage
/login                     → LoginPage
/rejestracja               → RegisterPage
/reset-hasla               → ResetPasswordPage
/admin-login               → AdminLoginPage
/admin-register            → AdminRegisterPage

// Admin routes (Protected + Layout)
/admin                     → Dashboard
/admin/users               → UsersPage
/admin/roles               → RolesPage
/admin/law-firms           → LawFirmsPage
/admin/lawyers             → LawyersPage
/admin/cases               → CasesPage
/admin/documents           → DocumentsPage
/admin/payments            → PaymentsPage
/admin/invoices            → InvoicesPage
/admin/plans               → PlansPage
/admin/promotions          → PromotionsPage
/admin/ai-center           → AICenterPage
/admin/legal-knowledge     → LegalKnowledgePage
/admin/analytics           → AnalyticsPage
/admin/audit-log           → AuditLogPage
/admin/security            → SecurityPage
/admin/config              → SystemConfigPage
/admin/backups             → BackupsPage
/admin/logs                → SystemLogsPage
/admin/cookies             → CookiesPage
/admin/support             → SupportPage
/admin/cms                 → CMSPage

// Client routes (Protected + ClientLayout)
/klient                    → ClientDashboard
/klient/nowa-sprawa        → NewCase
/klient/sprawy             → ClientCases
/klient/wiadomosci         → ClientChat
/klient/platnosci          → ClientPayments

// Firm routes (Protected + FirmLayout)
/firma                     → FirmDashboard
/firma/sprawy              → FirmCases
/firma/prawnicy            → FirmLawyers
/firma/generator-ai        → FirmAIGenerator
/firma/szablony            → FirmTemplates
/firma/faktury             → FirmInvoices
/firma/kalendarz           → FirmCalendar
```

### 2.3 State Management

**AuthContext** - zarządzanie stanem użytkownika:
- `user: AuthUser | null` - dane zalogowanego użytkownika
- `isAuthenticated: boolean` - status logowania
- `login()` - logowanie użytkownika
- `logout()` - wylogowanie
- `switchRole()` - demo: zmiana roli

**Local State** - React useState/useReducer dla komponentów

**Future:** Rozważyć Zustand/Redux dla złożonego stanu (np. cache'owanie danych)

### 2.4 Data Models

Zobacz szczegółowe typy w [`src/types/index.ts`](../src/types/index.ts):

**Główne encje:**
- `User` - użytkownicy systemu
- `LawFirm` - kancelarie prawne
- `Lawyer` - prawnicy
- `Case` - sprawy prawne
- `Document` - dokumenty prawne
- `Payment` - płatności i escrow
- `Invoice` - faktury (integracja KSeF)
- `Plan` - plany subskrypcyjne
- `Promotion` - promocje i kody rabatowe
- `AuditEntry` - logi audytowe
- `Ticket` - zgłoszenia wsparcia
- `SystemLog` - logi systemowe
- `BackupEntry` - kopie zapasowe

---

## 3. TECH STACK

### 3.1 Frontend

| Technologia | Wersja | Cel |
|-------------|--------|-----|
| **React** | 19.2.14 | UI Framework |
| **TypeScript** | 5.9.3 | Type safety |
| **Vite** | 7.3.1 | Build tool |
| **React Router** | 7.13.0 | Routing |
| **Tailwind CSS** | 4.1.18 | Styling (utility-first) |
| **Axios** | 1.13.5 | HTTP Client |
| **React Hook Form** | 7.71.1 | Formularze |
| **Zod** | 4.3.6 | Walidacja (schema) |
| **Recharts** | 3.7.0 | Wykresy i analityka |
| **Lucide React** | 0.563.0 | Ikony |
| **@dnd-kit** | 6.3.1 | Drag & Drop (Kanban) |

### 3.2 Backend (Do Implementacji)

**Rekomendowane:**
- **Node.js + Express** lub **FastAPI** (Python)
- **PostgreSQL** - baza danych
- **Redis** - cache i sesje
- **MinIO/S3** - przechowywanie plików
- **JWT** - autoryzacja
- **Socket.io** - real-time chat
- **Bull** - kolejki zadań
- **Stripe API** - płatności
- **KSeF API** - faktury elektroniczne
- **OpenAI API** - GPT-4 dla AI
- **Pinecone/Qdrant** - wektorowa baza dla RAG

### 3.3 DevOps (Do Implementacji)

- **Docker** - konteneryzacja
- **GitHub Actions** - CI/CD
- **Vercel/Netlify** - hosting frontend
- **AWS/GCP/Railway** - backend hosting
- **Sentry** - error tracking
- **Plausible/Umami** - analytics

---

## 4. STRUKTURA PROJEKTU

```
legal-saas-admin/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config ⚠️ DO POPRAWY
├── postcss.config.js       # PostCSS config
│
├── public/
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service Worker
│
├── plans/
│   ├── mobile-first-audit-report.md  # Audyt responsywności
│   └── INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md  # Ten dokument
│
└── src/
    ├── main.tsx            # Entry point
    ├── App.tsx             # Root component + routing
    ├── index.css           # Global styles (5162 linii)
    ├── style.css           # Vite default styles (nieużywane?)
    │
    ├── components/
    │   ├── Layout.tsx              # Admin layout
    │   ├── Sidebar.tsx             # Admin sidebar
    │   ├── ClientLayout.tsx        # Client layout (bottom nav)
    │   ├── FirmLayout.tsx          # Firm layout
    │   └── ErrorBoundary.tsx       # Error handling
    │
    ├── context/
    │   └── AuthContext.tsx         # Auth state management
    │
    ├── data/
    │   ├── mockData.ts             # Mock data (dev)
    │   └── ragKnowledge.ts         # RAG knowledge base (mock)
    │
    ├── hooks/
    │   ├── useMediaQuery.ts        # Media queries (218 linii) ✅
    │   ├── useAutoSave.ts          # Auto-save hook
    │   └── useGlobalSearch.ts      # Global search
    │
    ├── pages/
    │   ├── Dashboard.tsx           # Admin dashboard
    │   ├── Users.tsx               # User management
    │   ├── Roles.tsx               # Role management
    │   ├── LawFirms.tsx            # Law firm management
    │   ├── Lawyers.tsx             # Lawyer management
    │   ├── Cases.tsx               # Case management
    │   ├── Documents.tsx           # Document management
    │   ├── Payments.tsx            # Payment & escrow
    │   ├── Invoices.tsx            # Invoices & KSeF
    │   ├── Plans.tsx               # Subscription plans
    │   ├── Promotions.tsx          # Promotions
    │   ├── AICenter.tsx            # AI center (RAG, GPT)
    │   ├── LegalKnowledge.tsx      # Legal knowledge base
    │   ├── Analytics.tsx           # Analytics & reports
    │   ├── AuditLog.tsx            # Audit log
    │   ├── Security.tsx            # Security settings
    │   ├── SystemConfig.tsx        # System config
    │   ├── Backups.tsx             # Backups
    │   ├── SystemLogs.tsx          # System logs
    │   ├── Cookies.tsx             # Cookie management
    │   ├── Support.tsx             # Support tickets
    │   ├── CMS.tsx                 # CMS & marketing
    │   ├── Login.tsx               # Client/Firm login
    │   ├── Register.tsx            # Client/Firm register
    │   ├── ResetPassword.tsx       # Password reset
    │   ├── AdminLogin.tsx          # Admin login
    │   ├── AdminRegister.tsx       # Admin register
    │   ├── LandingPage.tsx         # Public landing
    │   │
    │   ├── client/
    │   │   ├── ClientDashboard.tsx  # Client dashboard
    │   │   ├── NewCase.tsx          # New case form
    │   │   ├── ClientCases.tsx      # My cases
    │   │   ├── ClientChat.tsx       # Chat with lawyers
    │   │   └── ClientPayments.tsx   # Payment history
    │   │
    │   └── firm/
    │       ├── FirmDashboard.tsx    # Firm dashboard
    │       ├── FirmCases.tsx        # Firm cases (Kanban)
    │       ├── FirmLawyers.tsx      # Firm lawyers
    │       ├── FirmAIGenerator.tsx  # AI document generator
    │       ├── FirmTemplates.tsx    # Document templates
    │       ├── FirmInvoices.tsx     # Firm invoices
    │       └── FirmCalendar.tsx     # Calendar
    │
    ├── services/
    │   └── api.ts                   # Axios instance + services
    │
    ├── types/
    │   └── index.ts                 # TypeScript types
    │
    └── utils/
        └── passwordStrength.ts      # Password validation
```

---

## 5. STAN AKTUALNY

### 5.1 ✅ Co Jest Zrobione

#### Routing i Nawigacja
- ✅ Pełna struktura routingu (admin, klient, firma, public)
- ✅ Lazy loading wszystkich stron (React.lazy)
- ✅ Protected routes z AuthContext
- ✅ Role-based redirect (admin/kancelaria/klient)
- ✅ Sidebar z nawigacją (desktop + mobile overlay)
- ✅ Bottom navigation dla klienta (mobile-first)

#### Layout i UI
- ✅ Layout komponenty (admin, client, firm)
- ✅ Responsive sidebar (mobile overlay, desktop static)
- ✅ Topbar z search i notyfikacjami
- ✅ Global search hook (useGlobalSearch)
- ✅ Media query hooks (useMediaQuery, useIsMobile, etc.)
- ✅ Error boundary

#### Strony - Szkielety UI
- ✅ Wszystkie 25+ stron utworzone
- ✅ Dashboard z wykresami (Recharts)
- ✅ Tabele danych (Users, LawFirms, Lawyers, Cases, etc.)
- ✅ Formularze (Login, Register, NewCase, etc.)
- ✅ Kanban board (FirmCases) z drag & drop
- ✅ Landing page

#### Data i State
- ✅ TypeScript typy (User, LawFirm, Case, etc.)
- ✅ Mock data dla development
- ✅ AuthContext z role management
- ✅ API service z Axios interceptors

#### Style
- ✅ Tailwind CSS setup
- ✅ Custom CSS variables (dark theme)
- ✅ Komponenty UI (buttons, cards, badges, etc.)
- ✅ Animacje (fade-in, slide-up)
- ✅ Responsywne grid classes

### 5.2 ⚠️ Co Wymaga Dokończenia

#### Krytyczne (P0)
1. **Mobile responsiveness** - tabele nie działają na mobile (audit report wskazuje 4/10)
2. **Backend integration** - brak API endpoints
3. **Autentykacja** - JWT, refresh tokens, 2FA
4. **Walidacja formularzy** - brak walidacji Zod
5. **Error handling** - brak obsługi błędów API

#### Wysokie (P1)
6. **AI Integration** - GPT-4, RAG (Retrieval Augmented Generation)
7. **Payment gateway** - Stripe, escrow logic
8. **KSeF integration** - faktury elektroniczne
9. **File upload** - dokumenty, avatary
10. **Real-time chat** - Socket.io dla klient-prawnik

#### Średnie (P2)
11. **Search** - full-text search (ElasticSearch lub Algolia)
12. **Notifications** - system powiadomień (email, push)
13. **Calendar** - integracja z Google Calendar
14. **PDF generation** - dokumenty prawne
15. **Analytics** - szczegółowe raporty (Metabase?)

#### Niskie (P3)
16. **PWA** - service worker, offline mode
17. **i18n** - wielojęzyczność (obecnie PL)
18. **Dark/Light mode** - obecnie tylko dark
19. **Accessibility** - WCAG 2.1 AA
20. **SEO** - meta tags, SSR (Remix?)

### 5.3 🐛 Znane Problemy (z Audytu)

Z pliku [`plans/mobile-first-audit-report.md`](../plans/mobile-first-audit-report.md):

**Krytyczne problemy responsywności:**
1. Tabele danych nie są responsywne - brak horizontal scroll
2. Brak spójnych breakpointów w Tailwind config
3. Touch targets < 44px (iOS HIG minimum)
4. Kanban board niewidoczny na mobile
5. Modalne okna zbyt szerokie na małych ekranach
6. Hardcoded grids (np. `grid-2` zamiast `grid grid-cols-1 lg:grid-cols-2`)

**Ocena responsywności:**
- Panel Administratora: **6/10** ⚠️
- Panel Kancelarii: **6/10** ⚠️
- Panel Klienta: **7.5/10** ✅
- Strony publiczne: **7/10** ✅
- Tabele danych: **4/10** ❌ KRYTYCZNE

---

## 6. GŁÓWNE PROBLEMY DO ROZWIĄZANIA

### 6.1 Problem #1: Responsywność Tabel (KRYTYCZNY)

**Opis:**  
Tabele w stronach typu Users, LawFirms, Lawyers, Cases są zbudowane jako `<table>` HTML i nie działają na ekranach < 768px.

**Lokalizacja:**
- `src/pages/Users.tsx`
- `src/pages/LawFirms.tsx`
- `src/pages/Lawyers.tsx`
- `src/pages/Cases.tsx`
- `src/pages/Documents.tsx`
- etc.

**Rozwiązanie:**

**Opcja A: Card Layout na Mobile**
```tsx
// Hook do wykrycia mobile
const isMobile = useIsMobile();

return (
  <div className="card">
    {isMobile ? (
      // Mobile: Card layout
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="card">
            <div className="flex justify-between mb-2">
              <h4>{user.name}</h4>
              <span className={`badge badge-${user.status}`}>{user.status}</span>
            </div>
            <p className="text-sm text-slate-400">{user.email}</p>
            <p className="text-xs text-slate-500">{user.role}</p>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-sm">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      // Desktop: Table layout
      <table className="data-table">
        {/* existing table */}
      </table>
    )}
  </div>
);
```

**Opcja B: Horizontal Scroll (szybsze, ale gorsze UX)**
```tsx
<div className="overflow-x-auto -webkit-overflow-scrolling-touch">
  <table className="data-table min-w-full">
    {/* table content */}
  </table>
</div>
```

**Priorytet:** 🔴 P0 - KRYTYCZNY

---

### 6.2 Problem #2: Tailwind Config - Brak Breakpointów

**Opis:**  
`tailwind.config.js` nie definiuje custom breakpointów, przez co brakuje spójności.

**Lokalizacja:**  
[`tailwind.config.js`](../tailwind.config.js)

**Rozwiązanie:**

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '375px',   // iPhone SE
      'sm': '640px',   // Small tablets
      'md': '768px',   // Tablets
      'lg': '1024px',  // Laptops
      'xl': '1280px',  // Desktops
      '2xl': '1536px', // Large screens
    },
    extend: {
      colors: {
        // existing colors
      },
      spacing: {
        '18': '4.5rem',  // Bottom nav height
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      minHeight: {
        'touch': '44px',    // iOS HIG minimum
        'touch-lg': '48px', // Material Design minimum
      },
    },
  },
  plugins: [],
}
```

**Priorytet:** 🔴 P0

---

### 6.3 Problem #3: Backend Integration

**Opis:**  
Aplikacja używa mock data, brak integracji z prawdziwym API.

**Lokalizacja:**  
- `src/services/api.ts` - Axios setup OK, brak implementacji
- `src/data/mockData.ts` - mock data

**Rozwiązanie:**

**Krok 1: Environment Variables**
```bash
# .env.local
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
VITE_OPENAI_API_KEY=sk-xxxxx
```

**Krok 2: Implementacja Services**
```typescript
// src/services/api.ts

// Users
export const userService = {
  getAll: () => api.get('/users'),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: Partial<User>) => api.post('/users', data),
  update: (id: string, data: Partial<User>) => api.patch(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Law Firms
export const firmService = {
  getAll: () => api.get('/law-firms'),
  getById: (id: string) => api.get(`/law-firms/${id}`),
  create: (data: Partial<LawFirm>) => api.post('/law-firms', data),
  update: (id: string, data: Partial<LawFirm>) => api.patch(`/law-firms/${id}`, data),
  updateStatus: (id: string, status: string) => api.patch(`/law-firms/${id}/status`, { status }),
};

// Cases (już częściowo zaimplementowane)
export const caseService = {
  getAll: () => api.get('/cases'),
  getById: (id: string) => api.get(`/cases/${id}`),
  create: (data: Partial<Case>) => api.post('/cases', data),
  updateStatus: (id: string, status: string) => api.patch(`/cases/${id}/status`, { status }),
};

// AI Service (już częściowo zaimplementowane)
export const aiService = {
  analyze: (data: any) => api.post('/ai/analyze', data),
  generate: (data: any) => api.post('/ai/generate', data),
  ragQuery: (query: string) => api.post('/ai/rag', { query }),
};
```

**Krok 3: Zamiana Mock Data na API Calls**
```typescript
// Przykład: src/pages/Users.tsx

// PRZED (mock data):
import { users } from '../data/mockData';

// PO (API):
import { userService } from '../services/api';
import { useState, useEffect } from 'react';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    // existing UI
  );
}
```

**Priorytet:** 🔴 P0

---

### 6.4 Problem #4: Walidacja Formularzy

**Opis:**  
Formularze nie mają walidacji Zod, brak obsługi błędów.

**Lokalizacja:**
- `src/pages/Login.tsx`
- `src/pages/Register.tsx`
- `src/pages/client/NewCase.tsx`
- etc.

**Rozwiązanie:**

```typescript
// src/schemas/auth.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć min. 8 znaków'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// src/pages/Login.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../schemas/auth.schema';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.login(data);
      // success
    } catch (error) {
      // error handling
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email')} 
        placeholder="Email"
        className={errors.email ? 'border-red-500' : ''}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      
      <input 
        {...register('password')} 
        type="password"
        placeholder="Hasło"
        className={errors.password ? 'border-red-500' : ''}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      
      <button type="submit">Zaloguj</button>
    </form>
  );
}
```

**Schemas do utworzenia:**
- `auth.schema.ts` - login, register, reset password
- `case.schema.ts` - tworzenie sprawy
- `user.schema.ts` - zarządzanie użytkownikami
- `firm.schema.ts` - zarządzanie kancelariami
- `payment.schema.ts` - płatności

**Priorytet:** 🟡 P1

---

### 6.5 Problem #5: Error Handling

**Opis:**  
Brak globalnego error handling, toast notifications.

**Rozwiązanie:**

**Opcja A: React Toast (prosty)**
```bash
npm install react-hot-toast
```

```typescript
// src/utils/toast.ts
import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: '#10b981',
      color: '#fff',
    },
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      background: '#ef4444',
      color: '#fff',
    },
  });
};

// src/App.tsx
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* rest of app */}
    </>
  );
}
```

**Opcja B: Custom Toast System (bardziej kontroli)**
- Utworzyć `ToastContext.tsx`
- Custom hook `useToast()`
- Portal rendering

**Priorytet:** 🟡 P1

---

### 6.6 Problem #6: AI Integration

**Opis:**  
Brak implementacji GPT-4 i RAG dla generowania dokumentów.

**Backend wymagania:**
- OpenAI API integration
- Pinecone/Qdrant dla vector DB (RAG)
- Document templates
- Prompt engineering

**Frontend:**
```typescript
// src/pages/firm/FirmAIGenerator.tsx

const handleGenerate = async () => {
  setLoading(true);
  try {
    const response = await aiService.generate({
      template: selectedTemplate,
      caseData: {
        client: caseData.client,
        type: caseData.type,
        description: caseData.description,
      },
    });
    
    setGeneratedDocument(response.data.document);
    showSuccess('Dokument wygenerowany pomyślnie');
  } catch (error) {
    showError('Błąd generowania dokumentu');
  } finally {
    setLoading(false);
  }
};
```

**Priorytet:** 🟡 P1

---

### 6.7 Problem #7: Payment Integration

**Opis:**  
Brak integracji Stripe i escrow logic.

**Wymagania:**
- Stripe Elements dla form płatności
- Webhook handling (backend)
- Escrow states: `pending → paid → escrow → released`
- Refund logic

**Frontend:**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

```typescript
// src/pages/client/ClientPayments.tsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ caseId, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    
    if (!error) {
      await paymentService.createPayment({
        caseId,
        amount,
        paymentMethodId: paymentMethod.id,
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Zapłać {amount} zł</button>
    </form>
  );
}
```

**Priorytet:** 🟡 P1

---

## 7. PLAN DZIAŁANIA - PRIORYTETOWY

### FAZA 1: Mobile Responsiveness (Tydzień 1-2)

**Cel:** Naprawić krytyczne problemy responsywności zgodnie z audytem.

#### Tydzień 1
- [ ] **Dzień 1-2:** Naprawić `tailwind.config.js` - dodać breakpointy
- [ ] **Dzień 2-3:** Utworzyć komponent `DataTable` z mobile card layout
- [ ] **Dzień 3-4:** Zamienić tabele na responsive w:
  - [ ] `Users.tsx`
  - [ ] `LawFirms.tsx`
  - [ ] `Lawyers.tsx`
  - [ ] `Cases.tsx`
- [ ] **Dzień 4-5:** Naprawić Kanban board - horizontal scroll na mobile
- [ ] **Dzień 5:** Naprawić hardcoded grids (`grid-2` → Tailwind classes)

#### Tydzień 2
- [ ] **Dzień 1-2:** Zwiększyć touch targets (min. 44px)
- [ ] **Dzień 2-3:** Naprawić search dropdown na mobile
- [ ] **Dzień 3-4:** Full-screen modals na mobile
- [ ] **Dzień 4-5:** Testy na urządzeniach (iPhone SE, iPad, Android)
- [ ] **Dzień 5:** Lighthouse mobile audit (cel: > 90)

**Deliverables:**
- Wszystkie strony 100% responsywne
- Mobile score > 90 w Lighthouse
- Zadowoleni użytkownicy mobile

---

### FAZA 2: Backend Integration (Tydzień 3-5)

**Cel:** Połączyć frontend z prawdziwym API.

#### Tydzień 3: Setup Backend
- [ ] Zdecydować o stack'u (Node.js Express vs FastAPI)
- [ ] Setup PostgreSQL + migrations
- [ ] Utworzyć modele danych (User, LawFirm, Case, etc.)
- [ ] Implementacja JWT auth (/auth/login, /auth/register, /auth/refresh)
- [ ] CORS config

#### Tydzień 4: API Endpoints
- [ ] **Users API:** CRUD endpoints
- [ ] **LawFirms API:** CRUD + status management
- [ ] **Lawyers API:** CRUD + specializations
- [ ] **Cases API:** CRUD + status updates + assignment
- [ ] **Documents API:** CRUD + file upload
- [ ] **Payments API:** create, list, update status

#### Tydzień 5: Frontend Integration
- [ ] Rozszerzyć `src/services/api.ts` o wszystkie endpoint'y
- [ ] Zamienić mock data na API calls we wszystkich stronach
- [ ] Obsługa loading states (skeletons)
- [ ] Obsługa error states (toast notifications)
- [ ] Auth flow: login → token storage → refresh → logout

**Deliverables:**
- Działające API backend
- Frontend połączony z API
- Auth flow 100% funkcjonalny

---

### FAZA 3: Walidacja i Error Handling (Tydzień 6)

**Cel:** Dodać walidację Zod i profesjonalną obsługę błędów.

- [ ] **Dzień 1-2:** Utworzyć schemas Zod dla wszystkich formularzy
- [ ] **Dzień 2-3:** Implementacja React Hook Form z zodResolver
- [ ] **Dzień 3-4:** Setup Toast notification system (react-hot-toast)
- [ ] **Dzień 4-5:** Global error boundary + 404/500 pages
- [ ] **Dzień 5:** Input validation styling (error states)

**Deliverables:**
- Wszystkie formularze z walidacją
- Toast notifications działają
- Przyjazne komunikaty błędów

---

### FAZA 4: AI Integration (Tydzień 7-8)

**Cel:** Wdrożyć GPT-4 i RAG dla generowania dokumentów.

#### Tydzień 7: Backend AI
- [ ] Setup OpenAI API
- [ ] Implementacja document templates
- [ ] Prompt engineering dla różnych typów dokumentów
- [ ] Setup Pinecone/Qdrant dla RAG
- [ ] Indexowanie bazy wiedzy prawnej

#### Tydzień 8: Frontend AI
- [ ] Integracja AI Generator (`FirmAIGenerator.tsx`)
- [ ] Podgląd generowanych dokumentów
- [ ] Edycja i akceptacja dokumentów
- [ ] AI Search w bazie wiedzy (`LegalKnowledge.tsx`)
- [ ] Usage tracking i limity

**Deliverables:**
- Działający generator dokumentów AI
- RAG search w bazie prawa
- UI do zarządzania szablonami

---

### FAZA 5: Payments & Escrow (Tydzień 9-10)

**Cel:** Wdrożyć system płatności Stripe + escrow.

#### Tydzień 9: Stripe Integration
- [ ] Setup Stripe account (test mode)
- [ ] Implementacja Stripe Elements w UI
- [ ] Payment flow: create → confirm → success
- [ ] Webhook handling (backend)
- [ ] Refund logic

#### Tydzień 10: Escrow Logic
- [ ] Escrow states: `pending → paid → escrow → released`
- [ ] Release payment po zakończeniu sprawy
- [ ] Dispute handling
- [ ] Payment history dla klienta i kancelarii

**Deliverables:**
- Działające płatności Stripe
- Escrow system 100% funkcjonalny
- Payment dashboard

---

### FAZA 6: KSeF Integration (Tydzień 11)

**Cel:** Integracja z Krajowym Systemem e-Faktur.

- [ ] **Dzień 1-2:** Setup KSeF API credentials (test environment)
- [ ] **Dzień 2-3:** Implementacja wysyłki faktur do KSeF
- [ ] **Dzień 3-4:** Odbieranie UPO (Urzędowe Poświadczenie Odbioru)
- [ ] **Dzień 4-5:** Status tracking: `draft → sent → ksef-accepted → paid`
- [ ] **Dzień 5:** UI do zarządzania fakturami (`Invoices.tsx`)

**Deliverables:**
- Faktury automatycznie wysyłane do KSeF
- Status tracking
- PDF generation

---

### FAZA 7: Real-time Features (Tydzień 12)

**Cel:** Dodać real-time chat i notifications.

- [ ] **Dzień 1-2:** Setup Socket.io (backend + frontend)
- [ ] **Dzień 2-3:** Implementacja chat (`ClientChat.tsx`)
- [ ] **Dzień 3-4:** Real-time notifications
- [ ] **Dzień 4-5:** Online/offline status
- [ ] **Dzień 5:** Typing indicators, read receipts

**Deliverables:**
- Działający real-time chat
- Push notifications
- Online status

---

### FAZA 8: Advanced Features (Tydzień 13-14)

**Cel:** Dokończyć zaawansowane funkcje.

- [ ] File upload (AWS S3 / MinIO)
- [ ] PDF generation (puppeteer / pdfkit)
- [ ] Email notifications (SendGrid / Postmark)
- [ ] Calendar integration (Google Calendar API)
- [ ] Full-text search (ElasticSearch / Algolia)
- [ ] Advanced analytics (Metabase)

**Deliverables:**
- Upload plików działa
- PDF generation
- Email notifications
- Calendar sync

---

### FAZA 9: Testing & QA (Tydzień 15)

**Cel:** Testy, bugfixy, optymalizacja.

- [ ] Unit tests (Vitest)
- [ ] Integration tests (Playwright)
- [ ] E2E tests (Playwright)
- [ ] Performance optimization (Lighthouse)
- [ ] Security audit (OWASP)
- [ ] Accessibility audit (axe DevTools)
- [ ] Load testing (k6)

**Deliverables:**
- 80%+ test coverage
- Brak critical bugs
- Performance score > 90

---

### FAZA 10: Production Deployment (Tydzień 16)

**Cel:** Deploy do produkcji.

- [ ] Setup production environment
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Plausible / Umami)
- [ ] Monitoring (Uptime Robot / Better Stack)
- [ ] Backup strategy
- [ ] SSL certificates
- [ ] Domain setup
- [ ] Launch! 🚀

**Deliverables:**
- Aplikacja live w produkcji
- Monitoring działa
- Backup strategy w miejscu

---

## 8. STANDARDY KODOWANIA

### 8.1 TypeScript

**ZAWSZE:**
- ✅ Używaj `interface` dla model data, `type` dla unions/helpers
- ✅ Wszystkie komponenty typowane (`React.FC` lub `function Component(): JSX.Element`)
- ✅ Props zawsze z interfejsem
- ✅ Nie używaj `any` - jeśli musisz, dodaj komentarz `// @ts-ignore` z wyjaśnieniem
- ✅ Import typów z `src/types/index.ts`

```typescript
// ✅ DOBRZE
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  // ...
}

// ❌ ŹLE
export function UserCard(props: any) {
  // ...
}
```

### 8.2 React

**Komponenty:**
- ✅ Function components (nie class components)
- ✅ Hooks na początku komponenetu
- ✅ Event handlers prefixed z `handle` (np. `handleSubmit`, `handleClick`)
- ✅ Async handlers z try/catch

```typescript
// ✅ DOBRZE
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**State:**
- ✅ `useState` dla local state
- ✅ `useContext` dla global state
- ✅ `useReducer` dla complex state logic
- ✅ Избегай prop drilling - użyj Context

**Performance:**
- ✅ `React.memo` dla expensive components
- ✅ `useMemo` dla expensive calculations
- ✅ `useCallback` dla event handlers w optimized lists
- ✅ Lazy load strony (`React.lazy`)

### 8.3 Tailwind CSS

**Klasowanie:**
- ✅ Mobile-first (bez breakpointu = mobile, `md:` = tablet+, `lg:` = desktop+)
- ✅ Kolejność: layout → sizing → spacing → typography → colors → effects
- ✅ Unikaj inline styles - zawsze Tailwind + CSS variables

```tsx
// ✅ DOBRZE
<div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
  <h3 className="text-lg font-semibold text-slate-100">Title</h3>
</div>

// ❌ ŹLE
<div style={{ display: 'flex', padding: '16px' }}>
  <h3 style={{ fontSize: '18px' }}>Title</h3>
</div>
```

**Responsywność:**
```tsx
// ✅ DOBRZE - mobile first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// ❌ ŹLE - desktop first
<div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
```

### 8.4 Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (np. `UserCard.tsx`)
- Hooks: `camelCase.ts` (np. `useMediaQuery.ts`)
- Utils: `camelCase.ts` (np. `passwordStrength.ts`)
- Types: `camelCase.ts` (np. `index.ts`, `auth.types.ts`)
- Services: `camelCase.ts` (np. `api.ts`, `authService.ts`)

**Variables & Functions:**
- Variables: `camelCase` (np. `userName`, `isLoading`)
- Constants: `UPPER_SNAKE_CASE` (np. `API_BASE_URL`, `MAX_FILE_SIZE`)
- Functions: `camelCase` (np. `getUserById`, `handleSubmit`)
- Components: `PascalCase` (np. `UserCard`, `LoginForm`)

### 8.5 Comments

**ZAWSZE komentuj:**
- ✅ Complex logic
- ✅ Workarounds / hacks
- ✅ TODO items
- ✅ Public API (JSDoc)

```typescript
/**
 * Hook do wykrywania media queries
 * @param query - Media query string (np. '(max-width: 768px)')
 * @returns boolean - czy media query pasuje
 */
export function useMediaQuery(query: string): boolean {
  // Implementation...
}

// TODO: Add error handling for socket disconnection
// FIXME: Race condition when user spams submit button
// HACK: Workaround for iOS Safari 100vh bug
```

### 8.6 Code Organization

**Folder structure w komponencie:**
```typescript
// src/pages/Users/
// ├── index.tsx          // Main component
// ├── UserCard.tsx       // Sub-component
// ├── UserForm.tsx       // Form component
// └── useUsers.ts        // Custom hook
```

**Imports order:**
1. React & Third-party
2. Context & Hooks
3. Components
4. Utils & Types
5. Styles

```typescript
// 1. React & Third-party
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash } from 'lucide-react';

// 2. Context & Hooks
import { useAuth } from '../context/AuthContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

// 3. Components
import UserCard from '../components/UserCard';

// 4. Utils & Types
import { User } from '../types';
import { showSuccess, showError } from '../utils/toast';

// 5. Services
import { userService } from '../services/api';
```

### 8.7 Error Handling Pattern

```typescript
// ✅ Standardowy pattern dla API calls
const [data, setData] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await userService.getAll();
    setData(response.data);
  } catch (err) {
    const message = err.response?.data?.message || 'Wystąpił błąd';
    setError(message);
    showError(message);
  } finally {
    setLoading(false);
  }
};

// UI
if (loading) return <LoadingSkeleton />;
if (error) return <ErrorState message={error} onRetry={loadData} />;
return <DataTable data={data} />;
```

---

## 9. INTEGRACJA BACKEND

### 9.1 Wymagane API Endpoints

#### Authentication
```
POST   /api/auth/register          # Rejestracja
POST   /api/auth/login             # Logowanie → { access_token, refresh_token, user }
POST   /api/auth/refresh           # Odświeżenie tokenu
POST   /api/auth/logout            # Wylogowanie
POST   /api/auth/reset-password    # Reset hasła
POST   /api/auth/verify-email      # Weryfikacja email
POST   /api/auth/enable-2fa        # Włączenie 2FA
```

#### Users
```
GET    /api/users                  # Lista użytkowników (paginated)
POST   /api/users                  # Utworzenie użytkownika
GET    /api/users/:id              # Szczegóły użytkownika
PATCH  /api/users/:id              # Aktualizacja użytkownika
DELETE /api/users/:id              # Usunięcie użytkownika
PATCH  /api/users/:id/status       # Zmiana statusu (active/suspended)
```

#### Law Firms
```
GET    /api/law-firms              # Lista kancelarii
POST   /api/law-firms              # Utworzenie kancelarii
GET    /api/law-firms/:id          # Szczegóły kancelarii
PATCH  /api/law-firms/:id          # Aktualizacja kancelarii
DELETE /api/law-firms/:id          # Usunięcie kancelarii
PATCH  /api/law-firms/:id/status   # Zmiana statusu
PATCH  /api/law-firms/:id/plan     # Zmiana planu
```

#### Lawyers
```
GET    /api/lawyers                # Lista prawników
POST   /api/lawyers                # Dodanie prawnika
GET    /api/lawyers/:id            # Szczegóły prawnika
PATCH  /api/lawyers/:id            # Aktualizacja prawnika
DELETE /api/lawyers/:id            # Usunięcie prawnika
```

#### Cases
```
GET    /api/cases                  # Lista spraw (filtry, pagination)
POST   /api/cases                  # Utworzenie sprawy
GET    /api/cases/:id              # Szczegóły sprawy
PATCH  /api/cases/:id              # Aktualizacja sprawy
DELETE /api/cases/:id              # Usunięcie sprawy
PATCH  /api/cases/:id/status       # Zmiana statusu sprawy
PATCH  /api/cases/:id/assign       # Przypisanie prawnika
GET    /api/cases/:id/history      # Historia zmian
```

#### Documents
```
GET    /api/documents              # Lista dokumentów
POST   /api/documents              # Upload dokumentu
GET    /api/documents/:id          # Pobranie dokumentu
PATCH  /api/documents/:id          # Aktualizacja metadanych
DELETE /api/documents/:id          # Usunięcie dokumentu
GET    /api/documents/:id/versions # Historia wersji
```

#### Payments
```
GET    /api/payments               # Lista płatności
POST   /api/payments               # Utworzenie płatności (Stripe)
GET    /api/payments/:id           # Szczegóły płatności
PATCH  /api/payments/:id/release   # Release escrow
PATCH  /api/payments/:id/refund    # Refund
POST   /api/payments/webhook       # Stripe webhook
```

#### Invoices
```
GET    /api/invoices               # Lista faktur
POST   /api/invoices               # Utworzenie faktury
GET    /api/invoices/:id           # Szczegóły faktury
PATCH  /api/invoices/:id           # Aktualizacja faktury
POST   /api/invoices/:id/ksef      # Wysłanie do KSeF
GET    /api/invoices/:id/pdf       # PDF faktury
```

#### Plans
```
GET    /api/plans                  # Lista planów
POST   /api/plans                  # Utworzenie planu
PATCH  /api/plans/:id              # Aktualizacja planu
DELETE /api/plans/:id              # Usunięcie planu
```

#### Promotions
```
GET    /api/promotions             # Lista promocji
POST   /api/promotions             # Utworzenie promocji
PATCH  /api/promotions/:id         # Aktualizacja promocji
DELETE /api/promotions/:id         # Usunięcie promocji
POST   /api/promotions/validate    # Walidacja kodu promocyjnego
```

#### AI
```
POST   /api/ai/generate            # Generowanie dokumentu
POST   /api/ai/analyze             # Analiza dokumentu
POST   /api/ai/rag                 # RAG query
GET    /api/ai/templates           # Lista szablonów AI
POST   /api/ai/templates           # Utworzenie szablonu
```

#### Analytics
```
GET    /api/analytics/dashboard    # Dashboard metrics
GET    /api/analytics/revenue      # Revenue data
GET    /api/analytics/cases        # Cases statistics
GET    /api/analytics/ai-usage     # AI usage stats
```

#### Audit Log
```
GET    /api/audit-log              # Historia zmian (paginated, filtry)
```

#### System
```
GET    /api/system/config          # Konfiguracja systemu
PATCH  /api/system/config          # Aktualizacja konfiguracji
GET    /api/system/logs            # Logi systemowe
GET    /api/system/backups         # Lista backupów
POST   /api/system/backups         # Utworzenie backupu
GET    /api/system/health          # Health check
```

#### Support
```
GET    /api/support/tickets        # Lista zgłoszeń
POST   /api/support/tickets        # Utworzenie zgłoszenia
GET    /api/support/tickets/:id    # Szczegóły zgłoszenia
PATCH  /api/support/tickets/:id    # Aktualizacja zgłoszenia
POST   /api/support/tickets/:id/messages  # Dodanie wiadomości
```

### 9.2 Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email jest wymagany",
    "field": "email"
  }
}
```

**Pagination:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 9.3 Authentication Flow

1. **Login** → Backend zwraca `{ access_token, refresh_token, user }`
2. Frontend zapisuje w `localStorage`:
   - `auth_token` = access_token (krótki TTL, np. 15 min)
   - `refresh_token` = refresh_token (długi TTL, np. 7 dni)
   - `auth_user` = user data
3. Każdy request: `Authorization: Bearer {access_token}`
4. Gdy access_token expire → automatyczny refresh:
   ```typescript
   // src/services/api.ts - Response Interceptor
   api.interceptors.response.use(
     (response) => response,
     async (error) => {
       if (error.response?.status === 401) {
         const refreshToken = localStorage.getItem('refresh_token');
         try {
           const { data } = await axios.post('/api/auth/refresh', { refreshToken });
           localStorage.setItem('auth_token', data.access_token);
           error.config.headers.Authorization = `Bearer ${data.access_token}`;
           return api.request(error.config);
         } catch {
           localStorage.clear();
           window.location.href = '/login';
         }
       }
       return Promise.reject(error);
     }
   );
   ```

---

## 10. CHECKLIST PRODUKCYJNY

### 10.1 Frontend

#### Performance
- [ ] Lazy loading wszystkich stron ✅ (już zrobione)
- [ ] Code splitting
- [ ] Image optimization (WebP, lazy loading)
- [ ] Bundle size < 500kb (gzip)
- [ ] Lighthouse score > 90 (mobile & desktop)
- [ ] Remove `console.log` w produkcji

#### SEO
- [ ] Meta tags dla każdej strony
- [ ] Open Graph tags
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Structured data (JSON-LD)

#### Accessibility
- [ ] ARIA labels na interaktywnych elementach
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Alt text na obrazkach
- [ ] Color contrast ratio > 4.5:1
- [ ] Screen reader testing

#### Security
- [ ] XSS protection (sanitize inputs)
- [ ] CSRF tokens
- [ ] Content Security Policy (CSP)
- [ ] HTTPS only
- [ ] Secure cookies (httpOnly, secure, sameSite)

#### Error Handling
- [ ] 404 page
- [ ] 500 page
- [ ] Network error handling
- [ ] Offline mode (PWA)
- [ ] Error boundary

#### Testing
- [ ] Unit tests > 80% coverage
- [ ] Integration tests
- [ ] E2E tests (critical user flows)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS Safari, Android Chrome)

### 10.2 Backend

#### Security
- [ ] JWT tokens (short-lived access, long-lived refresh)
- [ ] Password hashing (bcrypt, min. 10 rounds)
- [ ] Rate limiting (express-rate-limit)
- [ ] Input validation (Joi / Zod)
- [ ] SQL injection protection (ORM)
- [ ] CORS config (whitelist origins)
- [ ] helmet.js dla HTTP headers

#### Performance
- [ ] Database indexing
- [ ] Caching (Redis)
- [ ] Connection pooling
- [ ] Compression (gzip)
- [ ] CDN dla static assets

#### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Logging (Winston / Pino)
- [ ] APM (New Relic / DataDog)
- [ ] Uptime monitoring (Better Stack)

#### Backup
- [ ] Automated daily backups
- [ ] Backup retention policy (30 dni)
- [ ] Disaster recovery plan
- [ ] Point-in-time recovery

#### Documentation
- [ ] API documentation (Swagger / Postman)
- [ ] Environment variables documented
- [ ] Deployment guide
- [ ] Runbook dla incydentów

### 10.3 DevOps

#### CI/CD
- [ ] GitHub Actions workflow
- [ ] Automated tests w CI
- [ ] Automated deployment (staging + production)
- [ ] Rollback strategy

#### Infrastructure
- [ ] Production environment setup
- [ ] Staging environment setup
- [ ] Database (PostgreSQL managed)
- [ ] Redis cache
- [ ] File storage (S3 / MinIO)
- [ ] Load balancer
- [ ] SSL certificates (Let's Encrypt)

#### Scalability
- [ ] Horizontal scaling (containerized)
- [ ] Database read replicas
- [ ] CDN dla static assets
- [ ] Auto-scaling rules

---

## 11. DEPLOYMENT

### 11.1 Frontend Deployment (Vercel - Rekomendowane)

**Dlaczego Vercel?**
- ✅ Zero-config deployment dla Vite
- ✅ Automatic HTTPS
- ✅ Edge Network (CDN)
- ✅ Preview deployments dla PR
- ✅ Darmowy tier dla projektów komercyjnych

**Kroki:**

1. **Przygotowanie:**
```bash
# .env.production
VITE_API_URL=https://api.yourproject.com
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
```

2. **Build test:**
```bash
npm run build
npm run preview  # Test production build locally
```

3. **Deploy:**
```bash
npm install -g vercel
vercel login
vercel  # Deploy to preview
vercel --prod  # Deploy to production
```

4. **Environment Variables w Vercel Dashboard:**
- Dashboard → Settings → Environment Variables
- Dodaj wszystkie zmienne z `.env.production`

**Alternatywy:**
- **Netlify** - podobne do Vercel
- **Cloudflare Pages** - darmowy, szybki
- **AWS S3 + CloudFront** - bardziej kontroli

### 11.2 Backend Deployment

**Opcja A: Railway (Najprostsze)**
```bash
# 1. Zainstaluj Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Add PostgreSQL
railway add postgresql

# 5. Deploy
railway up
```

**Opcja B: AWS (Produkcyjna)**
- EC2 dla aplikacji
- RDS dla PostgreSQL
- S3 dla plików
- CloudFront dla CDN
- Route53 dla DNS
- ALB dla load balancing

**Opcja C: DigitalOcean App Platform**
- Managed PostgreSQL
- Managed Redis
- Spaces dla plików
- Auto-scaling

### 11.3 Domain Setup

1. **Kup domenę** (np. `yourproject.pl` na OVH, Cloudflare)
2. **DNS Records:**
   ```
   A     @           → Frontend IP (lub CNAME do Vercel)
   A     api         → Backend IP
   CNAME www         → @
   TXT   @           → SPF record dla emaili
   ```
3. **SSL Certificates:**
   - Vercel: automatyczne
   - Backend: Let's Encrypt (Certbot)

---

## 12. DOKUMENTACJA TECHNICZNA

### 12.1 README.md (Zaktualizować)

```markdown
# Legal SaaS Admin Panel

> Kompleksowy system zarządzania kancelariami prawnymi built with React + TypeScript + Tailwind

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Axios
- Recharts
- React Hook Form + Zod

## 📁 Project Structure

See [INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md) for full documentation.

## 🔑 Environment Variables

```bash
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

## 📚 Documentation

- [Completion Instructions](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md)
- [Mobile-First Audit](plans/mobile-first-audit-report.md)

## 📄 License

Proprietary
```

### 12.2 Dokumenty do Utworzenia

1. **API.md** - pełna dokumentacja API endpoints
2. **CONTRIBUTING.md** - guide dla developerów
3. **ARCHITECTURE.md** - deep dive w architekturę
4. **SECURITY.md** - security policy
5. **CHANGELOG.md** - historia zmian

---

## 📞 PODSUMOWANIE DLA WYKONAWCY

### Co Masz Dostać:

1. **Kompletną aplikację production-ready** - 100% funkcjonalna, bez bug'ów krytycznych
2. **Mobile-first responsiveness** - działa idealnie na wszystkich urządzeniach
3. **Backend API** - pełna integracja z prawdziwym API
4. **Payment system** - Stripe + escrow działające
5. **AI features** - generator dokumentów + RAG search
6. **KSeF integration** - faktury elektroniczne
7. **Testing** - 80%+ coverage, E2E tests
8. **Documentation** - pełna dokumentacja techniczna
9. **Deployment** - live w produkcji z monitoring

### Nie Ruszaj (Już Działa):

- ✅ Routing i nawigacja
- ✅ Layout komponenty
- ✅ AuthContext
- ✅ UI komponenty (buttons, cards, badges)
- ✅ Custom hooks (useMediaQuery, useGlobalSearch)
- ✅ TypeScript typy
- ✅ Struktura projektu

### Priorytet Pracy:

1. **NAJPIERW:** Mobile responsiveness (FAZA 1) - krytyczne!
2. **POTEM:** Backend integration (FAZA 2) - bez tego nic nie działa
3. **NASTĘPNIE:** Pozostałe fazy według planu

### Jakość Kodu:

- 🚫 **Nie duplikuj kodu** - używaj komponentów reużywalnych
- 🚫 **Nie zostawiaj TODO** - dokończ wszystko albo usuń
- ✅ **Refaktoryzuj** - czytelny, maintainable code
- ✅ **Komentuj** - złożoną logikę i edge cases
- ✅ **Testuj** - każda nowa feature = testy

### Kiedy Coś Nie Jest Jasne:

1. Przeczytaj ten dokument dokładnie
2. Przeczytaj [mobile-first-audit-report.md](mobile-first-audit-report.md)
3. Sprawdź istniejący kod - jak jest zrobione gdzie indziej
4. Jeśli nadal nieясne - zapytaj PRZED implementacją

---

## ✅ CHECKLIST STARTOWY

Zanim zaczniesz pracę, upewnij się że:

- [ ] Przeczytałeś cały ten dokument
- [ ] Przeczytałeś mobile-first audit report
- [ ] Zapoznałeś się ze strukturą projektu
- [ ] Zrozumiałeś routing i architekturę
- [ ] Masz dostęp do repozytorium
- [ ] Node.js 18+ zainstalowany
- [ ] Aplikacja uruchamia się lokalnie (`npm run dev`)
- [ ] Rozumiesz standardy kodowania
- [ ] Masz plan na pierwsze 2 tygodnie (FAZA 1)

---

**Powodzenia! 🚀**

*Dokument aktualizowany 14 lutego 2026*  
*W razie pytań: sprawdź kod, przeczytaj dokumentację, ask clarifying questions*
