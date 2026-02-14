# 🤖 INSTRUKCJE DLA OPENCLAW - Dokończenie Aplikacji Legal SaaS Admin

**Data utworzenia:** 14 lutego 2026
**Wersja:** 1.0
**Status:** Gotowe do wykonania

---

## 📋 SPIS TREŚCI

1. [Przegląd Zadania](#1-przegląd-zadania)
2. [Dokumentacja do Przeczytania](#2-dokumentacja-do-przeczytania)
3. [Konfiguracja Środowiska](#3-konfiguracja-środowiska)
4. [Uruchomienie Projektu](#4-uruchomienie-projektu)
5. [Sprawdzenie Konfiguracji VS Code](#5-sprawdzenie-konfiguracji-vs-code)
6. [Testowanie Responsywności](#6-testowanie-responsywności)
7. [Rozpoczęcie FAZY 1](#7-rozpoczęcie-fazy-1)
8. [Standardy Kodowania](#8-standardy-kodowania)
9. [Definicja Ukończenia](#9-definicja-ukończenia)

---

## 1. PRZEGLĄD ZADANIA

### Cel
Dokończyć aplikację **Legal SaaS Admin Panel** zgodnie z priorytetami zdefiniowanymi w dokumentacji. Aplikacja posiada szkielet UI, ale wymaga:

1. **Mobile responsiveness** (FAZA 1) - KRYTYCZNE - tabele nie działają na mobile
2. **Backend integration** (FAZA 2) - obecnie mock data
3. **Walidacja & Error handling** (FAZA 3)
4. **AI Integration** (FAZA 4) - GPT-4, RAG
5. **Payments & Escrow** (FAZA 5) - Stripe
6. **KSeF Integration** (FAZA 6)
7. **Real-time Features** (FAZA 7) - Socket.io
8. **Advanced Features** (FAZA 8)
9. **Testing & QA** (FAZA 9)
10. **Production Deploy** (FAZA 10)

### Timeline
- **16 tygodni** total
- **FAZA 1 (Mobile):** Tydzień 1-2
- **FAZA 2 (Backend):** Tydzień 3-5

---

## 2. DOKUMENTACJA DO PRZECZYTANIA

Przeczytaj w podanej kolejności (oszacowany czas):

### 1. QUICKSTART.md (5 minut)
- Lokalizacja: `/QUICKSTART.md`
- Zawartość: Szybki start, logowanie (demo), struktura plików
- **Dlaczego:** Szybki overview co jest zrobione

### 2. PRIORITIES.md (10 minut)
- Lokalizacja: `/PRIORITIES.md`
- Zawartość: Quick reference, timeline 16 tygodni, P0/P1/P2 priorytety
- **Dlaczego:** Rozumiesz co jest najważniejsze

### 3. INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md (30-60 minut)
- Lokalizacja: `/plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`
- Zawartość: Pełna dokumentacja techniczna (12k+ słów)
- **Dlaczego:** Kompletny przewodnik po architekturze, problemach i rozwiązaniach

### 4. mobile-first-audit-report.md (15 minut)
- Lokalizacja: `/plans/mobile-first-audit-report.md`
- Zawartość: Audyt responsywności, problemy i rozwiązania
- **Dlaczego:** FAZA 1 opiera się na tym raporcie

### 5. TODO.md (5 minut)
- Lokalizacja: `/TODO.md`
- Zawartość: Checklist postępu pracy
- **Dlaczego:** Będziesz tu odznaczać ukończone zadania

---

## 3. KONFIGURACJA ŚRODOWISKA

### Wymagania systemowe
- **Node.js:** 18+ (zalecane 20 LTS)
- **npm:** 9+ lub **pnpm** 8+
- **VS Code:** Najnowsza wersja z zalecanymi rozszerzeniami
- **Git:** Do wersjonowania

### GitHub Copilot - Model Sonnet 4.6

**Ważne:** Ustaw model **Claude Sonnet 4.6** jako główny model do budowania aplikacji.

#### Konfiguracja Copilot:

1. **Otwórz VS Code Settings:**
   - `Cmd+,` (macOS) lub `Ctrl+,` (Windows/Linux)
   - Lub: `Code → Settings...`

2. **Znajdź ustawienia Copilot:**
   - Szukaj: `@ext:github.copilot`

3. **Ustaw model:**
   - **Chat model:** `Claude Sonnet 4.6`
   - **Inline completion model:** `Claude Sonnet 4.6`

#### Alternatywna konfiguracja JSON:

Dodaj do `.vscode/settings.json`:

```json
{
  "github.copilot.chat.codeModel": "claude-sonnet-4.6",
  "github.copilot.inlineSuggest.codeModel": "claude-sonnet-4.6"
}
```

#### Dlaczego Sonnet 4.6?

- ✅ Najlepszy model do kodowania (balans szybkości i jakości)
- ✅ Dobre rozumienie kontekstu React + TypeScript
- ✅ Skuteczne refaktoryzowanie i debugowanie
- ✅ Wsparcie dla Tailwind CSS i React patterns

#### Wskazówki użytkowania:

```markdown
# Przykład prompta dla Copilot z Sonnet 4.6:

"Stwórz komponent UserCard zgodny z:
- Mobile-first approach (useIsMobile hook)
- Tailwind CSS classes (zdefiniowane w tailwind.config.js)
- TypeScript types z src/types/index.ts
- Standardy kodowania z INSTRUKCJE-DLACLAW.md"
```

### Zalecane rozszerzenia VS Code

Sprawdź czy masz zainstalowane:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",           // ESLint
    "esbenp.prettier-vscode",           // Prettier
    "bradlc.vscode-tailwindcss",        // Tailwind CSS IntelliSense
    "dsznajder.es7-react-js-snippets",  // React/JSX snippets
    "formulahendry.auto-rename-tag",    // Auto rename tag
    "christian-kohler.path-intellisense", // Path intellisense
    "visualstudioexptteam.vscodeintellicode" // AI-assisted IntelliSense
  ]
}
```

**Instalacja:**
1. Otwórz VS Code
2. `Cmd+Shift+X` (Extensions)
3. Szukaj "@recommended" lub instaluj ręcznie z listy powyżej

---

## 4. URUCHOMIENIE PROJEKTU

### Krok 1: Instalacja zależności

```bash
# Wejdź do katalogu projektu
cd /Users/ps/Desktop/legal-saas-admin

# Zainstaluj zależności
npm install
```

**Oczekiwany wynik:** `node_modules/` utworzony, bez błędów

### Krok 2: Uruchomienie dev servera

```bash
# Uruchom development server
npm run dev
```

**Oczekiwany wynik:**
```
  VITE v7.3.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
  ➜  press h + enter to show help
```

### Krok 3: Otwórz w przeglądarce

Otwórz **http://localhost:5173**

Powinieneś zobaczyć stronę logowania.

### Krok 4: Zaloguj się (Demo)

Wybierz jedną z ról do testowania:

#### 🔑 Admin (Super Admin)
- URL: `/admin-login`
- Email: `jan@admin.pl`
- Hasło: **dowolne** (mock auth)
- Przekierowanie: `/admin` - Panel administratora

#### 🏢 Kancelaria (Law Firm)
- URL: `/login`
- Email: `robert@kancelaria-nowak.pl`
- Hasło: **dowolne**
- Przekierowanie: `/firma` - Panel kancelarii

#### 👤 Klient (Client)
- URL: `/login`
- Email: `maria@email.pl`
- Hasło: **dowolne**
- Przekierowanie: `/klient` - Panel klienta

---

## 5. SPRAWDZENIE KONFIGURACJI VS CODE

### Sprawdź czy VS Code jest poprawnie skonfigurowany

Plik konfiguracyjny: `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["className\\s*[:=]\\s*['\"`]([^'\"`]*)['\"`]", "([^'\"`]*)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

### Checklist konfiguracji VS Code

- [ ] **Format on save** - `editor.formatOnSave: true`
- [ ] **Default formatter** - `esbenp.prettier-vscode`
- [ ] **ESLint on save** - `source.fixAll.eslint: true`
- [ ] **Tailwind CSS IntelliSense** - aktywowany
- [ ] **TypeScript workspace** - używa `node_modules/typescript/lib`
- [ ] **Zalecane rozszerzenia** - zainstalowane (patrz sekcja 3)

### Weryfikacja TypeScript

Otwórz dowolny plik `.tsx` i sprawdź:

1. **Czy IntelliSense działa?** - Powinienieś widzieć typy i autocomplete
2. **Czy nie ma czerwonych podkreśleń?** - TypeScript errors powinny być widoczne
3. **Czy CMD+klik działa?** - Kliknij z CMD na imporcie, powinien otworzyć się plik

Jeśli coś nie działa:
```bash
# Restart TS Server w VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Dodatkowe ustawienia (opcjonalnie)

Jeśli chcesz lepsze DX, rozważ:

```json
// .vscode/settings.json - dodatkowe
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

---

## 6. TESTOWANIE RESPONSYWNOŚCI

### Chrome DevTools Setup

1. Otwórz DevTools:
   - **macOS:** `Cmd+Opt+I`
   - **Windows/Linux:** `F12`

2. Włącz Device Toolbar:
   - **macOS:** `Cmd+Shift+M`
   - Lub kliknij ikonę telefonu w DevTools

3. Testuj na trzech rozdzielczościach:

| Urządzenie | Szerokość | Status aplikacji |
|------------|-----------|------------------|
| iPhone SE | 375px | ⚠️ Tabele nie działają |
| iPad | 768px | ⚠️ Wymaga popraw |
| Desktop | 1920px | ✅ Działa dobrze |

### Znane problemy (do naprawienia w FAZIE 1)

1. **Tabele** - Kategorie oceny: 4/10
   - Tabele w Users.tsx, LawFirms.tsx, Lawyers.tsx, Cases.tsx
   - Na mobile są nieczytelne - kolumny ucinane
   - Rozwiązanie: Card layout na mobile

2. **Touch targets** - Ocena: 5/10
   - Przyciski < 44px (iOS HIG minimum)
   - Sidebar links, action buttons
   - Rozwiązanie: Zwiększyć min-height

3. **Kanban board** - Ocena: 4/10
   - FirmCases.tsx - 8 kolumn na mobile
   - Rozwiązanie: Horizontal scroll + snap

4. **Modals** - Ocena: 6/10
   - Zbyt szerokie na małych ekranach
   - Rozwiązanie: Full-screen na mobile

### Szybki test

Przejdź przez te strony i sprawdź na mobile (375px):

- [ ] `/admin` - Dashboard
- [ ] `/admin/users` - Tabela użytkowników
- [ ] `/admin/law-firms` - Tabela kancelarii
- [ ] `/admin/cases` - Tabela spraw + Kanban
- [ ] `/firma/sprawy` - Kanban board (kancelarii)
- [ ] `/klient` - Dashboard klienta
- [ ] `/klient/sprawy` - Sprawy klienta

**Oznacz problemy:** Zrób zrzuty ekranu lub notatki co nie działa.

---

## 7. ROZPOCZĘCIE FAZY 1

### Priorytety FAZY 1 (Mobile Responsiveness)

#### Tydzień 1, Dzień 1-2: Tailwind Config

**Plik:** `tailwind.config.js`

**Obecny problem:** Brak zdefiniowanych breakpointów

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
      colors: { /* existing */ },
      fontFamily: { /* existing */ },
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

**Test:** `npm run build` - musi się buildować bez errors

#### Tydzień 1, Dzień 2-3: Responsive DataTable Component

**Utwórz:** `src/components/DataTable/index.tsx`

```tsx
import { useIsMobile } from '../hooks/useMediaQuery';

interface Column {
  key: string;
  header: string;
  mobileHidden?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  cardRender?: (row: any) => React.ReactNode;
}

export function ResponsiveTable({ columns, data, cardRender }: ResponsiveTableProps) {
  const isMobile = useIsMobile();

  if (isMobile && cardRender) {
    return (
      <div className="responsive-cards">
        {data.map((row, i) => (
          <div key={i} className="responsive-card">
            {cardRender(row)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Dodać CSS** w `src/index.css`:

```css
.responsive-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.responsive-card {
  background: var(--bg-card);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  padding: 16px;
}

@media (min-width: 768px) {
  .responsive-cards {
    display: none;
  }
}
```

#### Tydzień 1, Dzień 3-5: Zamiana tabel

**Pliki do modyfikacji:**

1. `src/pages/Users.tsx`
2. `src/pages/LawFirms.tsx`
3. `src/pages/Lawyers.tsx`
4. `src/pages/Cases.tsx`

**Wzór implementacji** (Users.tsx):

```tsx
import { ResponsiveTable } from '../components/DataTable';
import { useIsMobile } from '../hooks/useMediaQuery';

function UsersPage() {
  const isMobile = useIsMobile();

  const columns = [
    { key: 'name', header: 'Użytkownik' },
    { key: 'role', header: 'Rola' },
    { key: 'lawFirm', header: 'Kancelaria' },
    { key: 'status', header: 'Status' },
  ];

  const cardRender = (user: User) => (
    <div className="user-card">
      <div className="user-card-header">
        <h4>{user.name}</h4>
        <span className={`badge badge-${user.status}`}>{user.status}</span>
      </div>
      <p className="text-sm text-slate-400">{user.email}</p>
      <p className="text-xs text-slate-500">{user.role}</p>
    </div>
  );

  return (
    <div className="page">
      <ResponsiveTable
        columns={columns}
        data={users}
        cardRender={cardRender}
      />
    </div>
  );
}
```

#### Tydzień 2, Dzień 1-2: Kanban board mobile

**Plik:** `src/pages/firm/FirmCases.tsx`

**Problem:** 8 kolumn na mobile

**Rozwiązanie:** Horizontal scroll z snap

```css
.kanban-board {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px 16px;
}

.kanban-column {
  min-width: calc(100vw - 48px);
  max-width: 320px;
  scroll-snap-align: center;
  flex-shrink: 0;
}
```

#### Tydzień 2, Dzień 2-3: Touch targets

**Pliki:** `src/components/Sidebar.tsx`, `src/components/Layout.tsx`

**Zwiększyć min-height do 44px:**

```css
.sidebar-link {
  min-height: 44px;
  padding: 12px 14px;
}

.btn {
  min-height: 44px;
  min-width: 44px;
}
```

#### Tydzień 2, Dzień 4-5: Final testing

**Checklist:**
- [ ] Test na iPhone SE (375px) - wszystkie strony
- [ ] Test na iPad (768px) - wszystkie strony
- [ ] Test na Desktop (1920px) - wszystkie strony
- [ ] Lighthouse mobile audit - cel: > 90
- [ ] Touch targets >= 44px
- [ ] Brak horizontal overflow (poza Kanban)

---

## 8. STANDARDY KODOWANIA

### TypeScript
- ✅ Function components (nie class)
- ✅ Interface dla modeli danych, Type dla unions
- ✅ Props zawsze typowane
- ✅ Unikaj `any` - jeśli musisz, dodaj komentarz `// @ts-ignore: ...`

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

### React
- ✅ Function components
- ✅ Hooks na początku komponentu
- ✅ Event handlers z prefix `handle`
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

### Tailwind CSS
- ✅ Mobile-first (bez breakpoint = mobile)
- ✅ Kolejność: layout → sizing → spacing → typography → colors
- ✅ Unikaj inline styles - używaj Tailwind

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

### Nazewnictwo

| Typ | Konwencja | Przykład |
|-----|-----------|----------|
| Pliki komponentów | `PascalCase.tsx` | `UserCard.tsx` |
| Pliki hooków | `camelCase.ts` | `useMediaQuery.ts` |
| Zmienne | `camelCase` | `userName`, `isLoading` |
| Stałe | `UPPER_SNAKE_CASE` | `API_BASE_URL` |
| Funkcje | `camelCase` | `getUserById` |
| Komponenty | `PascalCase` | `UserCard`, `LoginForm` |

---

## 9. DEFINICJA UKOŃCZENIA

### Każda feature musi mieć:

- [ ] Działa na mobile (375px)
- [ ] Działa na tablet (768px)
- [ ] Działa na desktop (1920px)
- [ ] TypeScript - brak błędów
- [ ] Loading states (jeśli applicable)
- [ ] Error states (jeśli applicable)
- [ ] Touch targets >= 44px (mobile)
- [ ] Accessibility (keyboard navigation, ARIA)
- [ ] Skomentowana złożona logika
- [ ] Przetestowane manually
- [ ] Brak `console.log` w produkcji
- [ ] Commit z opisem zgodnym z conventional commits

### FAZA 1 Definition of Done:

- [ ] Wszystkie strony responsywne (375px - 1920px)
- [ ] Tabele działają na mobile (card layout)
- [ ] Touch targets >= 44px
- [ ] Kanban board scrollable na mobile
- [ ] Brak horizontal overflow
- [ ] Lighthouse mobile score > 90

---

## 10. PRZYKŁADOWY WORKFLOW DNIA

### Morning (Plan)
1. Sprawdź TODO.md - co dzisiaj
2. Przeczytaj opis task'u z PRIORITIES.md
3. Zaplanuj approach (max 15 minut)

### During (Execution)
1. Mobile-first approach - najpierw mobile, potem desktop
2. Test często - po każdej zmianie sprawdź na mobile/desktop
3. Commit często - małe, logiczne commity

### Evening (Review)
1. Manual testing - sprawdź co zrobiłeś
2. Sprawdź TypeScript errors - `npm run build` lub sprawdź w edytorze
3. Usuń debug code - `console.log`, `debugger`
4. Update TODO.md - zmień 🔴 na ✅

---

## 11. CZĘSTE PYTANIA

### Q: Od czego zacząć?
**A:** FAZA 1, Dzień 1 → Napraw `tailwind.config.js` - dodaj breakpointy

### Q: Jak testować responsywność?
**A:** Chrome DevTools → Device Toolbar (`Cmd+Shift+M`). Test na iPhone SE (375px), iPad (768px), Responsive (1920px)

### Q: Co jeśli coś nie działa?
**A:**
1. Console errors → Fix
2. TypeScript errors → Fix
3. Still broken → Sprawdź Network tab (API calls)

### Q: Jak często commitować?
**A:** Często. Małe, logiczne commity. Np: "feat(users): add mobile card layout" zamiast "WIP everything"

### Q: Gdzie szukać pomocy?
**A:**
1. Sprawdź istniejący kod - podobne komponenty
2. INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md - pełna dokumentacja
3. mobile-first-audit-report.md - szczegóły audyt

---

## 12. SNELPRAWDZCZE CHECKLISTY

### Przed startem (5 minut)
- [ ] Przeczytałem QUICKSTART.md
- [ ] Przeczytałem PRIORITIES.md
- [ ] Przeczytałem INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md (sekcje 1-7)
- [ ] Przeczytałem mobile-first-audit-report.md
- [ ] Przeczytałem ten dokument
- [ ] Zrozumiałem co to FAZA 1

### Konfiguracja (10 minut)
- [ ] npm install zakończony sukcesem
- [ ] npm run dev działa
- [ ] http://localhost:5173 otwiera się
- [ ] Zalogowałem się jako admin
- [ ] Zalogowałem się jako kancelaria
- [ ] Zalogowałem się jako klient
- [ ] VS Code ma zainstalowane rozszerzenia
- [ ] VS Code settings.json jest poprawny
- [ ] TypeScript IntelliSense działa

### Testowanie (10 minut)
- [ ] Chrome DevTools Device Toolbar działa
- [ ] Przetestowałem na iPhone SE (375px)
- [ ] Przetestowałem na iPad (768px)
- [ ] Przetestowałem na Desktop (1920px)
- [ ] Widzę że tabele nie działają na mobile

### Gotowość do pracy
- [ ] Rozumiem priorytety: FAZA 1 (mobile) jest NAJWAŻNIEJSZA
- [ ] Mam plan na Dzień 1-2: naprawić tailwind.config.js
- [ ] Znam gdzie znaleźć pomoc: dokumentacja w folderze `plans/`
- [ ] Jestem gotowy do pracy 🚀

---

## 📞 WSPARCIE

Jeśli napotkasz problem:
1. Sprawdź dokumentację - jest wyczerpująca
2. Sprawdź istniejący kod - są wzorce do naśladowania
3. Zadaj pytanie z odpowiednim kontekstem

---

**Powodzenia! 🚀**

*Dokument utworzony 14 lutego 2026*
*Dla openclaw - AI agent deweloperski*
*Project: Legal SaaS Admin Panel*
