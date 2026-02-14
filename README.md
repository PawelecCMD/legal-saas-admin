# Legal SaaS Admin Panel

> Kompletna platforma SaaS do zarządzania kancelariami prawnymi. Panel administratora + Panel kancelarii + Panel klienta.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646cff)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

Application będzie dostępny na **http://localhost:5173**

---

## 📖 Dokumentacja

### Dla Developerów

| Dokument | Opis |
|----------|------|
| **[INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md)** | 📘 Główna dokumentacja - architektura, plan działania, standardy |
| **[PRIORITIES.md](PRIORITIES.md)** | 🎯 Quick reference - co robić w jakiej kolejności |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | 🤝 Guide dla developerów - workflow, code style |
| **[mobile-first-audit-report.md](plans/mobile-first-audit-report.md)** | 📱 Audyt responsywności - problemy i rozwiązania |

### Dla Product Ownerów

- **Stan projektu:** W trakcie rozwoju (MVP gotowy, wymaga dokończenia)
- **Timeline:** 16 tygodni do produkcji
- **Priorytety:** Mobile responsiveness → Backend → AI → Payments

---

## 🏗️ Tech Stack

### Frontend
- **React 19** + **TypeScript 5.9** - UI Framework
- **Vite 7** - Build tool & dev server
- **React Router 7** - Routing (SPA)
- **Tailwind CSS 4** - Utility-first CSS
- **Axios** - HTTP Client
- **React Hook Form** + **Zod** - Formularze i walidacja
- **Recharts** - Wykresy i analityka
- **Lucide React** - Ikony
- **@dnd-kit** - Drag & Drop (Kanban board)

### Backend (Do Implementacji)
- **Node.js + Express** lub **FastAPI** (Python)
- **PostgreSQL** - Database
- **Redis** - Cache & sessions
- **Stripe** - Payments
- **OpenAI API** - GPT-4 dla AI features
- **KSeF API** - Faktury elektroniczne

---

## 📁 Struktura Projektu

```
legal-saas-admin/
├── plans/                          # Dokumentacja projektu
│   ├── INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md
│   └── mobile-first-audit-report.md
├── src/
│   ├── components/                 # Reusable components
│   │   ├── Layout.tsx             # Admin layout
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   ├── ClientLayout.tsx       # Client layout (mobile-first)
│   │   ├── FirmLayout.tsx         # Law firm layout
│   │   └── ErrorBoundary.tsx      # Error handling
│   ├── context/
│   │   └── AuthContext.tsx        # Authentication state
│   ├── hooks/
│   │   ├── useMediaQuery.ts       # Responsive breakpoints
│   │   ├── useAutoSave.ts         # Auto-save logic
│   │   └── useGlobalSearch.ts     # Global search
│   ├── pages/                      # Route components
│   │   ├── Dashboard.tsx          # Admin dashboard
│   │   ├── Users.tsx              # User management
│   │   ├── LawFirms.tsx           # Law firm management
│   │   ├── Cases.tsx              # Case management
│   │   ├── client/                # Client portal pages
│   │   └── firm/                  # Law firm portal pages
│   ├── services/
│   │   └── api.ts                 # Axios instance + API calls
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   └── passwordStrength.ts    # Utilities
│   ├── data/
│   │   └── mockData.ts            # Mock data (development)
│   ├── App.tsx                    # Root component + routing
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles (5000+ lines)
├── tailwind.config.js              # Tailwind configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🎨 Features

### ✅ Zaimplementowane

- [x] **Routing** - pełna struktura (admin/kancelaria/klient/public)
- [x] **Authentication** - role-based access control
- [x] **Layouts** - responsywne layouty (admin, client, firm)
- [x] **Dashboard** - wykresy (Recharts), KPI cards
- [x] **Tabele** - zarządzanie użytkownikami, kancelariami, sprawami
- [x] **Kanban Board** - drag & drop dla spraw (firm panel)
- [x] **Forms** - login, register, new case
- [x] **Global Search** - wyszukiwanie cross-panel
- [x] **Notifications** - dropdown w topbar
- [x] **Mobile Navigation** - bottom nav dla klientów
- [x] **TypeScript** - 100% typed
- [x] **Mock Data** - development data

### ⚠️ W Trakcie (Do Dokończenia)

- [ ] **Mobile Responsiveness** - tabele nie działają na < 768px (PRIORYTET #1)
- [ ] **Backend Integration** - wymaga API endpoints
- [ ] **Walidacja Formularzy** - Zod schemas
- [ ] **Error Handling** - toast notifications
- [ ] **AI Integration** - GPT-4, RAG dla dokumentów
- [ ] **Payment Gateway** - Stripe + escrow
- [ ] **KSeF Integration** - faktury elektroniczne
- [ ] **Real-time Chat** - Socket.io
- [ ] **File Upload** - dokumenty, avatary

### 🔮 Planowane

- [ ] PWA - offline mode
- [ ] i18n - wielojęzyczność
- [ ] Dark/Light mode toggle
- [ ] Advanced Analytics
- [ ] Calendar Integration

---

## 👥 User Roles

Aplikacja wspiera 3 główne role:

### 1. **Admin (Super Admin)**
Pełny dostęp do systemu:
- Zarządzanie kancelariami (status, plany, limity)
- Zarządzanie użytkownikami i prawnikami
- Monitoring spraw i dokumentów
- Płatności i faktury (KSeF)
- Plany subskrypcyjne i promocje
- AI Center - zarządzanie modelami i bazą wiedzy
- Analityka i raporty
- Security & Audit logs

**Demo login:**
- Email: `jan@admin.pl`
- Hasło: dowolne (obecnie mock auth)

### 2. **Kancelaria (Law Firm)**
Zarządzanie kancelarią:
- Dashboard z KPI kancelarii
- Zarządzanie prawnikami
- Sprawy (Kanban board)
- Generator dokumentów AI
- Szablony dokumentów
- Faktury
- Kalendarz terminów

**Demo login:**
- Email: `robert@kancelaria-nowak.pl`
- Hasło: dowolne

### 3. **Klient (Client)**
Portal klienta:
- Dashboard ze sprawami
- Tworzenie nowej sprawy
- Lista moich spraw
- Czat z prawnikami
- Płatności

**Demo login:**
- Email: `maria@email.pl`
- Hasło: dowolne

---

## 🔧 Development

### Environment Variables

Utwórz plik `.env.local`:

```bash
# API Backend URL
VITE_API_URL=http://localhost:8000/api

# Stripe (development keys)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# OpenAI (dla AI features)
VITE_OPENAI_API_KEY=sk-xxxxx
```

### Scripts

```bash
# Development server (hot reload)
npm run dev

# Type check (bez build)
npm run typecheck

# Build dla produkcji
npm run build

# Preview production build
npm run preview

# Lint (jeśli skonfigurowane)
npm run lint
```

### Coding Standards

**Mobile-first approach:**
```tsx
// ✅ DOBRZE
<div className="
  grid-cols-1          // mobile default
  md:grid-cols-2       // tablet 768px+
  lg:grid-cols-4       // desktop 1024px+
">

// ❌ ŹLE - desktop first
<div className="grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
```

**TypeScript:**
```typescript
// ✅ Zawsze typuj props
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
}

// ❌ Unikaj 'any'
function MyComponent(props: any) { }
```

Zobacz pełne standardy w [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📱 Responsywność

### Breakpoints (Tailwind)

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| `xs` | 375px | iPhone SE |
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Responsive Hooks

```typescript
import { useIsMobile, useIsTablet, useIsDesktop } from './hooks/useMediaQuery';

function MyComponent() {
  const isMobile = useIsMobile();     // < 768px
  const isTablet = useIsTablet();     // 768px - 1023px
  const isDesktop = useIsDesktop();   // >= 1024px
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Known Issues

⚠️ **Critical:** Tabele nie są responsywne na mobile - zobacz [mobile-first-audit-report.md](plans/mobile-first-audit-report.md)

---

## 🚀 Deployment

### Frontend (Vercel - Recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Environment Variables w Vercel:**
- Dashboard → Settings → Environment Variables
- Dodaj `VITE_API_URL`, `VITE_STRIPE_PUBLIC_KEY`, etc.

### Backend

Rekomendacje:
- **Railway** - najprostsze (managed PostgreSQL + Redis)
- **AWS** - najbardziej kontroli (EC2, RDS, S3)
- **DigitalOcean** - kompromis (App Platform)

Zobacz szczegóły w [INSTRUKCJE - Deployment](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md#11-deployment).

---

## 🧪 Testing

### Manual Testing

```bash
# 1. Start dev server
npm run dev

# 2. Test viewports
# Chrome DevTools → Device Toolbar (Cmd+Shift+M)
# - iPhone SE (375px)
# - iPad (768px)
# - Responsive (1920px)

# 3. Test features
# - Login flow
# - Create/Edit operations
# - Mobile navigation
# - Touch gestures (если mobile)
```

### Automated Testing (To Do)

- [ ] Unit tests (Vitest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)

---

## 📊 Project Status

### Timeline

| Faza | Tydzień | Status |
|------|---------|--------|
| FAZA 1: Mobile Responsiveness | 1-2 | 🔴 TODO |
| FAZA 2: Backend Integration | 3-5 | 🔴 TODO |
| FAZA 3: Walidacja & Errors | 6 | 🔴 TODO |
| FAZA 4: AI Integration | 7-8 | 🔴 TODO |
| FAZA 5: Payments & Escrow | 9-10 | 🔴 TODO |
| FAZA 6: KSeF Integration | 11 | 🔴 TODO |
| FAZA 7: Real-time Features | 12 | 🔴 TODO |
| FAZA 8: Advanced Features | 13-14 | 🔴 TODO |
| FAZA 9: Testing & QA | 15 | 🔴 TODO |
| FAZA 10: Production Deploy | 16 | 🔴 TODO |

**Current Phase:** Przygotowanie do FAZA 1 - Mobile Responsiveness

Zobacz szczegółowy plan w [PRIORITIES.md](PRIORITIES.md).

---

## 🤝 Contributing

Przeczytaj [CONTRIBUTING.md](CONTRIBUTING.md) przed rozpoczęciem pracy.

**Quick checklist:**
- [ ] Mobile-first approach
- [ ] TypeScript - no `any`
- [ ] Test na 3 viewportach (375px, 768px, 1920px)
- [ ] Touch targets >= 44px
- [ ] No `console.log` w commited code
- [ ] Sensowne commit messages

---

## 📄 License

Proprietary - Legal SaaS Admin Panel

---

## 📞 Support

**Dokumentacja:**
- [INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md) - pełna dokumentacja
- [PRIORITIES.md](PRIORITIES.md) - co robić w jakiej kolejności
- [CONTRIBUTING.md](CONTRIBUTING.md) - workflow dla developerów

**Issues:** Zgłaszaj problemy jako GitHub Issues (jeśli repo publiczne)

---

**Built with ❤️ for legal professionals**

*Last updated: 14 lutego 2026*
