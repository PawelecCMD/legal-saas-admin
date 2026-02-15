# TODO List - Legal SaaS Admin

> Trackuj postęp pracy. Odznaczaj ✅ po zakończeniu każdego zadania.

**Aktualizacja:** 14 lutego 2026
**Status projektu:** 🔴 W trakcie - FAZA 0 (Przygotowanie)

---

## ⚙️ PRZED ROZPOCĘCIEM PRACY - CHECKLIST

### Konfiguracja VS Code
- [ ] **Zalecane rozszerzenia zainstalowane:**
  - [ ] ESLint (dbaeumer.vscode-eslint)
  - [ ] Prettier (esbenp.prettier-vscode)
  - [ ] Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
  - [ ] React/JSX snippets (dsznajder.es7-react-js-snippets)
- [ ] **Format on save** włączony (`editor.formatOnSave: true`)
- [ ] **Default formatter** ustawiony na Prettier
- [ ] **TypeScript** używa workspace SDK (`node_modules/typescript/lib`)
- [ ] **Tailwind CSS IntelliSense** działa (sprawdź autocomplete klas)

### Weryfikacja TypeScript
- [ ] Otwórz dowolny plik `.tsx`
- [ ] Sprawdź czy IntelliSense działa (podpowiadanie typów)
- [ ] Sprawdź czy nie ma czerwonych faluj pod importami
- [ ] Test: `Cmd+klik` na imporcie powinien otworzyć plik

### Instalacja zależności
- [ ] `npm install` zakończony sukcesem
- [ ] `node_modules/` utworzony
- [ ] Brak błędów w terminalu

### Uruchomienie projektu
- [ ] `npm run dev` działa
- [ ] Dev server startuje na http://localhost:5173
- [ ] Brak błędów w konsoli przeglądarki

---

---

## ⏰ DEADLINE TRACKING

| Faza | Start | End | Status | Uwagi |
|------|-------|-----|--------|-------|
| FAZA 1 | - | - | 🔴 TODO | Mobile Responsiveness |
| FAZA 2 | - | - | 🔴 TODO | Backend Integration |
| FAZA 3 | - | - | 🔴 TODO | Walidacja & Errors |
| FAZA 4 | - | - | 🔴 TODO | AI Integration |
| FAZA 5 | - | - | 🔴 TODO | Payments & Escrow |
| FAZA 6 | - | - | 🔴 TODO | KSeF Integration |
| FAZA 7 | - | - | 🔴 TODO | Real-time Features |
| FAZA 8 | - | - | 🔴 TODO | Advanced Features |
| FAZA 9 | - | - | 🔴 TODO | Testing & QA |
| FAZA 10 | - | - | 🔴 TODO | Production Deploy |

---

## 🔴 FAZA 1: Mobile Responsiveness (Tydzień 1-2)

**Deadline:** _______________

### Tydzień 1
- [x] **Dzień 1-2:** Tailwind Config
  - [x] Dodać breakpointy (xs, sm, md, lg, xl, 2xl)
  - [x] Dodać spacing (safe-bottom, etc.)
  - [x] Dodać minHeight (touch, touch-lg)
  - [x] Test: `npm run build` bez errors

- [ ] **Dzień 2-3:** Responsive DataTable Component
  - [ ] Utworzyć `src/components/DataTable/index.tsx`
  - [ ] Mobile: Card layout
  - [ ] Desktop: Table layout
  - [ ] Hook: useIsMobile dla conditional rendering
  - [ ] Props: columns, data, actions

- [x] **Dzień 3-4:** Zamiana tabel administratora
  - [x] `src/pages/Users.tsx` - responsive table
  - [x] `src/pages/LawFirms.tsx` - responsive table
  - [x] `src/pages/Lawyers.tsx` - responsive table
  - [x] `src/pages/Cases.tsx` - responsive table
  - [ ] Test każdej strony: 375px, 768px, 1920px

- [x] **Dzień 4-5:** Pozostałe tabele
  - [x] `src/pages/Documents.tsx`
  - [x] `src/pages/Payments.tsx`
  - [x] `src/pages/Invoices.tsx`
  - [x] `src/pages/Promotions.tsx`
  - [x] `src/pages/Support.tsx` (tickets)

- [x] **Dzień 5:** Hardcoded grids
  - [x] `src/pages/Dashboard.tsx` - zamień `.grid-2` na Tailwind
  - [x] `src/pages/firm/FirmDashboard.tsx` - zamień grids
  - [x] Wszystkie inne wystąpienia hardcoded grids

### Tydzień 2
- [x] **Dzień 1-2:** Kanban board mobile
  - [x] `src/pages/firm/FirmCases.tsx`
  - [x] Horizontal scroll dla kolumn
  - [x] Touch-friendly drag handles
  - [ ] Test na iPhone SE

- [x] **Dzień 2-3:** Touch targets
  - [x] Sidebar links - min-height 44px
  - [x] Wszystkie buttony - min-height 44px
  - [x] Icon buttons - min-width/height 44px
  - [x] Bottom nav (client) - wysokość OK

- [x] **Dzień 3-4:** Modals i dropdowns
  - [x] Search dropdown - full-width na mobile
  - [x] User dropdown - positioning fix
  - [x] Notification dropdown - max-height + scroll
  - [x] Wszystkie modals - full-screen lub max-width

- [ ] **Dzień 4-5:** Final testing & fixes
  - [ ] Test wszystkich stron na iPhone SE (375px)
  - [ ] Test wszystkich stron na iPad (768px)
  - [ ] Test wszystkich stron na Desktop (1920px)
  - [ ] Fix discovered issues
  - [ ] Lighthouse mobile audit (cel: > 90)

**FAZA 1 DEFINITION OF DONE:**
- [ ] Wszystkie strony responsywne (375px - 1920px)
- [ ] Tabele działają na mobile (card layout)
- [ ] Touch targets >= 44px
- [ ] Kanban board scrollable na mobile
- [ ] Brak horizontal overflow
- [ ] Lighthouse mobile score > 90

---

## 🔴 FAZA 2: Backend Integration (Tydzień 3-5)

**Deadline:** _______________

### Tydzień 3: Backend Setup
- [ ] **Stack decision**
  - [ ] Node.js + Express vs FastAPI
  - [ ] Setup project structure
  - [ ] Environment variables

- [ ] **Database**
  - [ ] PostgreSQL setup (local + hosted)
  - [ ] Create schema
  - [ ] Migrations setup (Prisma/TypeORM/Alembic)
  - [ ] Seed data

- [ ] **Authentication**
  - [ ] JWT implementation
  - [ ] Refresh tokens
  - [ ] Password hashing (bcrypt)
  - [ ] `/api/auth/login`
  - [ ] `/api/auth/register`
  - [ ] `/api/auth/refresh`
  - [ ] `/api/auth/logout`

### Tydzień 4: API Endpoints
- [ ] **Users API**
  - [ ] GET /api/users (list + pagination)
  - [ ] POST /api/users
  - [ ] GET /api/users/:id
  - [ ] PATCH /api/users/:id
  - [ ] DELETE /api/users/:id

- [ ] **Law Firms API**
  - [ ] GET /api/law-firms
  - [ ] POST /api/law-firms
  - [ ] GET /api/law-firms/:id
  - [ ] PATCH /api/law-firms/:id
  - [ ] PATCH /api/law-firms/:id/status

- [ ] **Lawyers API**
  - [ ] GET /api/lawyers
  - [ ] POST /api/lawyers
  - [ ] GET /api/lawyers/:id
  - [ ] PATCH /api/lawyers/:id
  - [ ] DELETE /api/lawyers/:id

- [ ] **Cases API**
  - [ ] GET /api/cases
  - [ ] POST /api/cases
  - [ ] GET /api/cases/:id
  - [ ] PATCH /api/cases/:id
  - [ ] PATCH /api/cases/:id/status
  - [ ] PATCH /api/cases/:id/assign

### Tydzień 5: Frontend Integration
- [ ] **API Service**
  - [ ] Rozszerzyć `src/services/api.ts`
  - [ ] userService (all endpoints)
  - [ ] firmService (all endpoints)
  - [ ] lawyerService (all endpoints)
  - [ ] caseService (all endpoints)

- [ ] **Replace Mock Data**
  - [ ] `src/pages/Users.tsx` - use API
  - [ ] `src/pages/LawFirms.tsx` - use API
  - [ ] `src/pages/Lawyers.tsx` - use API
  - [ ] `src/pages/Cases.tsx` - use API
  - [ ] `src/pages/Dashboard.tsx` - use API for stats

- [ ] **Loading & Error States**
  - [ ] Loading skeletons dla tabel
  - [ ] Empty states
  - [ ] Error states + retry button
  - [ ] Global error handling

- [ ] **Auth Flow**
  - [ ] Login flow - save tokens
  - [ ] Auto refresh tokens
  - [ ] Logout - clear tokens
  - [ ] Protected routes check

**FAZA 2 DEFINITION OF DONE:**
- [ ] Backend API deployed i dostępne
- [ ] Wszystkie strony używają API (nie mock data)
- [ ] Loading states działają
- [ ] Error handling działa
- [ ] Auth flow 100% funkcjonalny
- [ ] Tokens refresh automatycznie

---

## 🟡 FAZA 3: Walidacja & Error Handling (Tydzień 6)

**Deadline:** _______________

- [ ] **Zod Schemas**
  - [ ] `src/schemas/auth.schema.ts`
  - [ ] `src/schemas/user.schema.ts`
  - [ ] `src/schemas/firm.schema.ts`
  - [ ] `src/schemas/case.schema.ts`
  - [ ] `src/schemas/payment.schema.ts`

- [ ] **React Hook Form Integration**
  - [ ] `src/pages/Login.tsx`
  - [ ] `src/pages/Register.tsx`
  - [ ] `src/pages/client/NewCase.tsx`
  - [ ] Wszystkie formularze w admin panel

- [ ] **Toast Notifications**
  - [ ] Install react-hot-toast
  - [ ] Setup Toaster w App.tsx
  - [ ] Utility functions (showSuccess, showError)
  - [ ] Używaj w API calls

- [ ] **Error Pages**
  - [ ] 404 page
  - [ ] 500 page
  - [ ] Network error page

**FAZA 3 DEFINITION OF DONE:**
- [ ] Wszystkie formularze z walidacją Zod
- [ ] Toast notifications działają
- [ ] Error states przyjazne dla użytkownika
- [ ] Error boundary catches crashes

---

## 🟡 FAZA 4-10: Pozostałe (Do Uzupełnienia Po FAZIE 3)

_Szczegóły w [`PRIORITIES.md`](PRIORITIES.md) i [`INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md)_

---

## 📝 NOTES & BLOCKERS

### Blockers
_Lista rzeczy które blokują postęp:_

- [ ] Brak dostępu do... (example)
- [ ] Czekam na... (example)

### Decisions Needed
_Decyzje które trzeba podjąć:_

- [ ] Backend stack - Node.js vs FastAPI?
- [ ] Hosting - Railway vs AWS vs DO?
- [ ] Payment provider - tylko Stripe czy też Przelewy24?

### Questions
_Pytania do Product Ownera:_

- [ ] Jakie są wymagania dla...?
- [ ] Czy funkcja X jest potrzebna w MVP?

---

## 📊 PROGRESS TRACKING

### Overall Progress
- FAZA 1: ░░░░░░░░░░ 0%
- FAZA 2: ░░░░░░░░░░ 0%
- FAZA 3: ░░░░░░░░░░ 0%
- **TOTAL: 0/10 faz ukończonych**

### Daily Log

#### 2026-02-14 (Dzisiaj)
- ✅ Utworzono dokumentację projektu
- ✅ INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md (pełna dokumentacja)
- ✅ PRIORITIES.md (quick reference)
- ✅ CONTRIBUTING.md (workflow guide)
- ✅ QUICKSTART.md (5-min introduction)
- ✅ TODO.md (ten plik)
- ✅ INSTRUKCJE-DLACLAW.md (instrukcje dla developera)
- 🔴 Rozpoczęcie FAZY 1 - czeka

#### [Data] - [Co zostało zrobione]
- 

---

## ✅ QUICK WINS (Szybkie poprawki)

_Małe rzeczy które można zrobić od razu:_

- [ ] Dodać favicon
- [ ] Poprawić page titles (document.title)
- [ ] Dodać loading spinner (global)
- [ ] Poprawić 404 handling
- [ ] Remove unused imports
- [ ] Remove console.logs

---

**Aktualizuj ten plik codziennie!**  
✅ Mark completed tasks  
📝 Add daily notes  
🔴 Track blockers immediately
