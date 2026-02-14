# ⚡ QUICKSTART - Legal SaaS Admin

> 5-minutowy guide dla kogoś kto pierwszy raz otwiera projekt.

---

## 1️⃣ Pierwsze Uruchomienie (2 minuty)

```bash
# Klonuj repo
git clone <repo-url>
cd legal-saas-admin

# Zainstaluj dependencies
npm install

# Uruchom dev server
npm run dev
```

✅ Otwórz **http://localhost:5173** w przeglądarce

---

## 2️⃣ Zaloguj się (Demo)

Aplikacja ma **3 role** - wybierz jedną:

### 🔑 Admin (Super Admin)
- `/admin-login`
- Email: `jan@admin.pl`
- Hasło: **dowolne** (mock auth)
- **Przekierowanie:** `/admin` - Panel administratora

### 🏢 Kancelaria (Law Firm)
- `/login`
- Email: `robert@kancelaria-nowak.pl`
- Hasło: **dowolne**
- **Przekierowanie:** `/firma` - Panel kancelarii

### 👤 Klient (Client)
- `/login`
- Email: `maria@email.pl`
- Hasło: **dowolne**
- **Przekierowanie:** `/klient` - Panel klienta

> **Uwaga:** Obecnie aplikacja używa mock auth - każdy email i hasło zadziała, ale user data będzie domyślna dla każdej roli.

---

## 3️⃣ Przełączanie Ról (Development)

W panelu admina (sidebar na dole) są buttony do szybkiego przełączania:

- **"Tryb Admin"** → zmienia na rolę admin
- **"Tryb Kancelaria"** → zmienia na rolę kancelaria
- **"Tryb Klient"** → zmienia na rolę klient

Przydatne do testowania różnych widoków bez wylogowania.

---

## 4️⃣ Responsive Testing

**Chrome DevTools:**
1. Otwórz DevTools (`F12` lub `Cmd+Opt+I`)
2. Toggle Device Toolbar (`Cmd+Shift+M` lub ikonka telefonu)
3. Wybierz device:
   - **iPhone SE** (375px) - najmniejszy mobile
   - **iPad** (768px) - tablet
   - **Responsive** - desktop (ustaw na 1920px)

**⚠️ Znane problemy:**
- Tabele nie działają dobrze na mobile (< 768px) - to jest PRIORYTET #1 do naprawienia
- Zobacz [mobile-first-audit-report.md](plans/mobile-first-audit-report.md)

---

## 5️⃣ Co Możesz Zobaczyć

### Panel Administratora (`/admin`)

| Strona | URL | Opis |
|--------|-----|------|
| Dashboard | `/admin` | Wykresy, KPI, top kancelarie |
| Użytkownicy | `/admin/users` | Tabela użytkowników |
| Kancelarie | `/admin/law-firms` | Zarządzanie kancelariami |
| Prawnicy | `/admin/lawyers` | Lista prawników |
| Sprawy | `/admin/cases` | Wszystkie sprawy w systemie |
| Płatności | `/admin/payments` | Escrow, statusy płatności |
| Faktury | `/admin/invoices` | KSeF integration (mock) |
| AI Center | `/admin/ai-center` | RAG, GPT-4 (mock UI) |
| Analityka | `/admin/analytics` | Wykresy revenue, cases |

### Panel Kancelarii (`/firma`)

| Strona | URL | Opis |
|--------|-----|------|
| Dashboard | `/firma` | KPI kancelarii |
| Sprawy | `/firma/sprawy` | **Kanban board** (drag & drop) |
| Prawnicy | `/firma/prawnicy` | Lista prawników kancelarii |
| Generator AI | `/firma/generator-ai` | Generowanie dokumentów AI |
| Szablony | `/firma/szablony` | Template management |
| Kalendarz | `/firma/kalendarz` | Terminy |

### Panel Klienta (`/klient`)

| Strona | URL | Opis |
|--------|-----|------|
| Dashboard | `/klient` | Moje sprawy, stats |
| Sprawy | `/klient/sprawy` | Lista moich spraw |
| Nowa sprawa | `/klient/nowa-sprawa` | Formularz |
| Wiadomości | `/klient/wiadomosci` | Chat z prawnikami (mock) |
| Płatności | `/klient/platnosci` | Historia płatności |

**💡 Tip:** Panel klienta ma **bottom navigation** na mobile - testuj na iPhone SE!

---

## 6️⃣ Struktura Plików (Gdzie Co Jest)

```
src/
├── pages/               ← Tu są wszystkie strony
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── client/         ← Strony klienta
│   └── firm/           ← Strony kancelarii
├── components/          ← Layouty (Sidebar, Topbar)
├── hooks/              ← useMediaQuery, useGlobalSearch
├── types/index.ts      ← TypeScript types
├── data/mockData.ts    ← Mock data (development)
└── services/api.ts     ← Axios + API services
```

**Szukasz czegoś?**
- Layout admina: `src/components/Layout.tsx`
- Sidebar: `src/components/Sidebar.tsx`
- Routing: `src/App.tsx`
- Auth: `src/context/AuthContext.tsx`
- Styles: `src/index.css` (5000+ linii!)

---

## 7️⃣ Następne Kroki

### Dla Developera:

1. **Przeczytaj dokumentację:**
   - [`INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md) - pełna dokumentacja (12k+ słów)
   - [`PRIORITIES.md`](PRIORITIES.md) - co robić w jakiej kolejności
   - [`CONTRIBUTING.md`](CONTRIBUTING.md) - workflow i standardy

2. **Zrozum architekturę:**
   - Routing (React Router 7)
   - AuthContext (role-based access)
   - Responsive hooks (useMediaQuery)

3. **Zacznij od FAZY 1:**
   - Mobile responsiveness (PRIORYTET #1)
   - Napraw `tailwind.config.js`
   - Zamień tabele na responsive

### Dla Product Ownera:

1. **Sprawdź demo:**
   - Zaloguj się jako każda rola
   - Przetestuj wszystkie główne strony
   - Sprawdź na mobile (iPhone SE w DevTools)

2. **Przeczytaj plan:**
   - [`PRIORITIES.md`](PRIORITIES.md) - timeline 16 tygodni
   - [`INSTRUKCJE - Stan Aktualny`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md#5-stan-aktualny) - co jest zrobione

3. **Zrozum technical debt:**
   - [`mobile-first-audit-report.md`](plans/mobile-first-audit-report.md) - problemy responsywności
   - Backend wymaga implementacji (obecnie mock data)
   - Payment integration (Stripe) - todo
   - AI features (GPT-4, RAG) - todo

---

## 8️⃣ Common Commands

```bash
# Development
npm run dev              # Start dev server (port 5173)

# Build
npm run build            # Production build
npm run preview          # Preview production build

# Check
npm run typecheck        # TypeScript type check (nie ma tego w package.json - użyj tsc --noEmit)
```

---

## 9️⃣ Environment Variables

**Obecnie NIE WYMAGANE** (mock data).

Kiedy będziesz integrować backend, utwórz `.env.local`:

```bash
# Backend API
VITE_API_URL=http://localhost:8000/api

# Stripe (dla płatności)
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx

# OpenAI (dla AI features)
VITE_OPENAI_API_KEY=sk-xxxxx
```

---

## 🔟 Known Issues & Workarounds

### Issue: Tabele wychodzą poza ekran na mobile
**Workaround:** Otwórz w desktop mode lub zwiększ width DevTools  
**Fix:** FAZA 1 - responsive tables

### Issue: "Cannot find module" po `npm install`
**Fix:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors w edytorze
**Fix:** 
1. VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Lub zamknij i otwórz VS Code

### Issue: Port 5173 zajęty
**Fix:**
```bash
# Kill process na porcie 5173
lsof -ti:5173 | xargs kill
# Or use different port
npm run dev -- --port 3000
```

---

## ✅ Checklist Pierwszego Dnia

- [ ] Repo sklonowane
- [ ] `npm install` wykonane
- [ ] Dev server działa (`npm run dev`)
- [ ] Zalogowałem się jako admin
- [ ] Zalogowałem się jako kancelaria
- [ ] Zalogowałem się jako klient
- [ ] Przetestowałem na mobile viewport (DevTools)
- [ ] Otworzyłem kilka różnych stron
- [ ] Przeczytałem INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md (sekcja 1-5)
- [ ] Przeczytałem PRIORITIES.md
- [ ] Zrozumiałem że tabele nie działają na mobile (to normalne, do naprawienia)

---

**Gotowy do pracy? Start:** [`PRIORITIES.md`](PRIORITIES.md) → FAZA 1 🚀

*Powodzenia!*
