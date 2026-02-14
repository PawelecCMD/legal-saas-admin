# 🎯 PRIORYTETY - Quick Reference

> Szybki przegląd co robić w jakiej kolejności. Szczegóły w [`INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md).

---

## 📅 TIMELINE (16 tygodni)

| Tydzień | Faza | Cel | Status |
|---------|------|-----|--------|
| 1-2 | FAZA 1 | Mobile Responsiveness | 🔴 TODO |
| 3-5 | FAZA 2 | Backend Integration | 🔴 TODO |
| 6 | FAZA 3 | Walidacja & Errors | 🔴 TODO |
| 7-8 | FAZA 4 | AI Integration | 🔴 TODO |
| 9-10 | FAZA 5 | Payments & Escrow | 🔴 TODO |
| 11 | FAZA 6 | KSeF Integration | 🔴 TODO |
| 12 | FAZA 7 | Real-time Features | 🔴 TODO |
| 13-14 | FAZA 8 | Advanced Features | 🔴 TODO |
| 15 | FAZA 9 | Testing & QA | 🔴 TODO |
| 16 | FAZA 10 | Production Deploy | 🔴 TODO |

---

## 🔴 P0 - KRYTYCZNE (Tydzień 1-5)

### 1. Mobile Responsiveness (Tydzień 1-2)

**Dlaczego:** Aplikacja nie działa na mobile (audit: 4/10 dla tabel)

**Co zrobić:**
- [ ] Naprawić `tailwind.config.js` - dodać breakpointy
- [ ] Utworzyć responsive `DataTable` component (card layout na mobile)
- [ ] Zamienić wszystkie tabele na responsive:
  - [ ] `Users.tsx`
  - [ ] `LawFirms.tsx`
  - [ ] `Lawyers.tsx`
  - [ ] `Cases.tsx`
  - [ ] `Documents.tsx`
  - [ ] `Payments.tsx`
  - [ ] `Invoices.tsx`
- [ ] Naprawić Kanban board - horizontal scroll
- [ ] Zamienić hardcoded `grid-2` na Tailwind `grid grid-cols-1 lg:grid-cols-2`
- [ ] Zwiększyć touch targets do min. 44px
- [ ] Test na: iPhone SE (375px), iPad (768px), Desktop (1920px)

**Files:**
- `tailwind.config.js`
- `src/pages/Users.tsx`
- `src/pages/LawFirms.tsx`
- `src/pages/Lawyers.tsx`
- `src/pages/Cases.tsx`
- `src/pages/firm/FirmCases.tsx` (Kanban)
- `src/pages/Dashboard.tsx` (grid-2)
- `src/pages/firm/FirmDashboard.tsx` (grid-2)

### 2. Backend Integration (Tydzień 3-5)

**Dlaczego:** Bez API aplikacja jest tylko demo

**Co zrobić:**

**Tydzień 3: Setup**
- [ ] Wybrać tech stack (Node.js + Express vs FastAPI)
- [ ] Setup PostgreSQL
- [ ] Database schema + migrations
- [ ] JWT auth implementation
- [ ] CORS config

**Tydzień 4: API Endpoints**
- [ ] `/api/auth/*` - login, register, refresh, logout
- [ ] `/api/users/*` - CRUD
- [ ] `/api/law-firms/*` - CRUD + status
- [ ] `/api/lawyers/*` - CRUD
- [ ] `/api/cases/*` - CRUD + status + assign
- [ ] `/api/documents/*` - CRUD + upload
- [ ] `/api/payments/*` - CRUD + status

**Tydzień 5: Frontend Integration**
- [ ] Rozszerzyć `src/services/api.ts`
- [ ] Zamienić mock data na API calls (wszystkie strony)
- [ ] Loading states (skeletons)
- [ ] Error handling (toast notifications)
- [ ] Auth flow (login → token → refresh → logout)

**Files:**
- `src/services/api.ts`
- Wszystkie pliki w `src/pages/`
- `.env.local` - environment variables

---

## 🟡 P1 - WYSOKIE (Tydzień 6-12)

### 3. Walidacja Formularzy (Tydzień 6)

**Co zrobić:**
- [ ] Utworzyć Zod schemas w `src/schemas/`
- [ ] React Hook Form + zodResolver
- [ ] Toast notification system (react-hot-toast)
- [ ] Error boundary
- [ ] 404/500 pages

**Files:**
- `src/schemas/auth.schema.ts`
- `src/schemas/case.schema.ts`
- `src/schemas/user.schema.ts`
- `src/utils/toast.ts`
- `src/pages/Login.tsx`
- `src/pages/Register.tsx`
- `src/pages/client/NewCase.tsx`

### 4. AI Integration (Tydzień 7-8)

**Co zrobić:**
- [ ] OpenAI API setup (backend)
- [ ] Document templates
- [ ] Prompt engineering
- [ ] Pinecone/Qdrant setup (RAG)
- [ ] Index legal knowledge base
- [ ] Frontend AI Generator (`FirmAIGenerator.tsx`)
- [ ] Preview & edit generated docs
- [ ] AI Search (`LegalKnowledge.tsx`)

**Files:**
- `src/pages/firm/FirmAIGenerator.tsx`
- `src/pages/LegalKnowledge.tsx`
- `src/pages/AICenter.tsx`
- `src/services/api.ts` - aiService

### 5. Payments & Escrow (Tydzień 9-10)

**Co zrobić:**
- [ ] Stripe account setup
- [ ] Stripe Elements integration
- [ ] Payment flow (create → confirm → success)
- [ ] Webhook handling (backend)
- [ ] Escrow states (pending → paid → escrow → released)
- [ ] Release payment logic
- [ ] Refund logic
- [ ] Payment dashboard

**Files:**
- `src/pages/client/ClientPayments.tsx`
- `src/pages/Payments.tsx`
- Install: `@stripe/stripe-js`, `@stripe/react-stripe-js`

### 6. KSeF Integration (Tydzień 11)

**Co zrobić:**
- [ ] KSeF API credentials (test env)
- [ ] Wysyłka faktur do KSeF
- [ ] UPO (Urzędowe Poświadczenie Odbioru)
- [ ] Status tracking
- [ ] PDF generation
- [ ] Invoice management UI

**Files:**
- `src/pages/Invoices.tsx`
- `src/pages/firm/FirmInvoices.tsx`

### 7. Real-time Features (Tydzień 12)

**Co zrobić:**
- [ ] Socket.io setup (backend + frontend)
- [ ] Chat implementation
- [ ] Real-time notifications
- [ ] Online/offline status
- [ ] Typing indicators
- [ ] Read receipts

**Files:**
- `src/pages/client/ClientChat.tsx`
- `src/components/Layout.tsx` - notifications

---

## 🟢 P2 - ŚREDNIE (Tydzień 13-14)

### 8. Advanced Features

**Co zrobić:**
- [ ] File upload (AWS S3 / MinIO)
- [ ] PDF generation (puppeteer)
- [ ] Email notifications (SendGrid)
- [ ] Calendar integration (Google Calendar)
- [ ] Full-text search (ElasticSearch)
- [ ] Advanced analytics

**Files:**
- `src/pages/Documents.tsx`
- `src/pages/firm/FirmCalendar.tsx`
- `src/pages/Analytics.tsx`

---

## ⚪ P3 - NISKIE (Jeśli zostanie czas)

- [ ] PWA (service worker, offline mode)
- [ ] i18n (wielojęzyczność)
- [ ] Dark/Light mode toggle
- [ ] WCAG 2.1 AA compliance
- [ ] SEO optimization

---

## 📊 DEFINITION OF DONE

### Każda Feature:

- [ ] Działa na mobile (375px)
- [ ] Działa na tablet (768px)
- [ ] Działa na desktop (1920px)
- [ ] TypeScript - brak błędów
- [ ] Loading states
- [ ] Error states
- [ ] Touch targets >= 44px (mobile)
- [ ] Accessibility (keyboard navigation, ARIA)
- [ ] Commented (complex logic)
- [ ] No console.log
- [ ] Tested manually

### Production Ready:

- [ ] Wszystkie P0 done
- [ ] Wszystkie P1 done
- [ ] Backend API deployed
- [ ] Frontend deployed
- [ ] Stripe w trybie live
- [ ] KSeF w trybie produkcyjnym
- [ ] SSL certificates
- [ ] Error tracking (Sentry)
- [ ] Monitoring (Better Stack)
- [ ] Backups automated
- [ ] Documentation complete

---

## 🚦 DAILY WORKFLOW

### Morning (Plan)
1. Sprawdź tę listę - co dzisiaj
2. Przeczytaj opis task'u w INSTRUKCJE
3. Zaplanuj approach

### During (Execution)
1. Mobile-first approach
2. Test często (mobile + desktop)
3. Commit często (małe, logiczne commity)

### Evening (Review)
1. Manual testing
2. Sprawdź TypeScript errors
3. Usuń debug code
4. Update ten plik - zmień 🔴 na ✅

---

## ❓ FAQ

**Q: Od czego zacząć?**  
A: FAZA 1 - Mobile Responsiveness. To najbardziej krytyczne.

**Q: Jak testować responsywność?**  
A: Chrome DevTools → Device Toolbar (Cmd+Shift+M). Test na iPhone SE (375px), iPad (768px), Responsive (1920px).

**Q: Gdzie sprawdzić jak coś zrobić?**  
A: 
1. Sprawdź istniejący kod - podobne komponenty
2. INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md
3. mobile-first-audit-report.md

**Q: Co jeśli coś nie działa?**  
A: 
1. Console errors → fix
2. TypeScript errors → fix
3. Still broken → sprawdź network tab (API calls)

**Q: Jak często commitować?**  
A: Często. Małe, logiczne commity. Np: "feat(users): add mobile card layout" zamiast "WIP everything".

---

**START HERE:** FAZA 1, Tydzień 1, Dzień 1 → Napraw `tailwind.config.js` 🚀

*Last updated: 14 lutego 2026*
