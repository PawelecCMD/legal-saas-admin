# Contributing Guide - Legal SaaS Admin

## 🎯 Cel Projektu

Ukończenie aplikacji Legal SaaS Admin do stanu **production-ready** bez zmian w istniejącej architekturze - tylko dokończenie i refaktoring.

## 📚 Wymagana Lektura

Przed rozpoczęciem pracy **musisz** przeczytać:

1. [`plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md) - główna dokumentacja
2. [`plans/mobile-first-audit-report.md`](plans/mobile-first-audit-report.md) - audyt responsywności

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone <repo-url>
cd legal-saas-admin

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:5173
```

## 🏗️ Workflow

### 1. Przed Rozpoczęciem Task'u

- [ ] Przeczytaj opis zadania w INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md
- [ ] Sprawdź czy nie duplikujesz istniejącego kodu
- [ ] Zapoznaj się z podobnymi komponentami w projekcie
- [ ] Zaplanuj approach (mobile-first!)

### 2. Podczas Pracy

- [ ] **Mobile-first approach** - zawsze zacznij od mobile (375px)
- [ ] Test na różnych ekranach: 375px, 768px, 1024px, 1920px
- [ ] Używaj TypeScript types (brak `any`)
- [ ] Przestrzegaj naming conventions (PascalCase dla komponentów, camelCase dla funkcji)
- [ ] Komentuj złożoną logikę
- [ ] Używaj istniejących hooków (useMediaQuery, useGlobalSearch, useAuth)

### 3. Po Zakończeniu

- [ ] Test manualny na mobile + desktop
- [ ] Sprawdź czy nie ma TypeScript errors (`npm run typecheck`)
- [ ] Sprawdź build (`npm run build`)
- [ ] Usuń `console.log` i debug code
- [ ] Dodaj komentarze JSDoc dla public functions
- [ ] Commit z sensownym message

## 📝 Commit Messages

Używamy [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     Nowa funkcjonalność
fix:      Poprawka buga
refactor: Refaktoring bez zmiany funkcjonalności
style:    Zmiany w stylowaniu (CSS, Tailwind)
docs:     Dokumentacja
test:     Testy
chore:    Inne (deps, config)

# Examples
feat(users): add mobile card layout for users table
fix(sidebar): touch targets below 44px
refactor(dashboard): remove hardcoded grid-2 classes
style(buttons): increase min-height to 48px
docs(readme): update installation instructions
```

## 🎨 Code Style

### TypeScript

```typescript
// ✅ DOBRZE
interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  return (
    <div className={`card ${className}`}>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}

// ❌ ŹLE
export function UserCard(props: any) {
  return <div>{props.user.name}</div>;
}
```

### React Hooks

```typescript
// ✅ Hooks na początku
export function MyComponent() {
  const [state, setState] = useState('');
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // side effects
  }, []);
  
  // handlers poniżej
  const handleClick = () => {};
  
  return <div>...</div>;
}

// ❌ Hooks w środku lub warunkowe
export function MyComponent() {
  const [state, setState] = useState('');
  
  if (condition) {
    const [other, setOther] = useState(''); // ❌ BŁĄD!
  }
}
```

### Tailwind CSS

```tsx
// ✅ Mobile-first, uporządkowane
<div className="
  flex flex-col items-center gap-4
  p-4 rounded-lg
  bg-slate-800 hover:bg-slate-700
  transition-colors
  md:flex-row md:gap-6
  lg:p-6
">
  Content
</div>

// ❌ Desktop-first, chaotyczne
<div className="bg-slate-800 lg:p-6 flex hover:bg-slate-700 md:gap-6 p-4 gap-4 transition-colors rounded-lg md:flex-row flex-col items-center">
  Content
</div>
```

### Async/Await

```typescript
// ✅ DOBRZE - try/catch/finally
const handleSubmit = async () => {
  setLoading(true);
  try {
    const response = await api.createUser(data);
    showSuccess('User created');
    return response.data;
  } catch (error) {
    showError(error.message);
    console.error('Create user error:', error);
  } finally {
    setLoading(false);
  }
};

// ❌ ŹLE - brak error handling
const handleSubmit = async () => {
  const response = await api.createUser(data);
  setLoading(false);
};
```

## 🧪 Testing

### Przed Commit

```bash
# 1. Type check
npm run build

# 2. Manual testing
npm run dev
# Test na:
# - Mobile (375px) - iPhone SE
# - Tablet (768px) - iPad
# - Desktop (1024px+)

# 3. Cross-browser (jeśli zmiana krytyczna)
# - Chrome
# - Safari
# - Firefox
```

### Testing Checklist

- [ ] Mobile viewport (375px) - wszystko widoczne, touch targets > 44px
- [ ] Tablet viewport (768px) - layout przechodzi płynnie
- [ ] Desktop viewport (1920px) - nie jest zbyt rozciągnięte
- [ ] Dark mode - kolory contrast OK
- [ ] Keyboard navigation - focus states widoczne
- [ ] Loading states - skeletons/spinners działają
- [ ] Error states - komunikaty wyświetlają się

## 🔧 Narzędzia Developerskie

### VS Code Extensions (Rekomendowane)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "esbenp.prettier-vscode"
  ]
}
```

### Browser DevTools

**Chrome DevTools:**
- Responsive mode: `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Win)
- Preset devices: iPhone SE, iPad, Responsive
- Network throttling: Slow 3G (test loading states)

**React DevTools:**
- Sprawdzaj component tree
- Profiler dla performance issues

## 📱 Responsywność - Quick Reference

### Breakpoints (Tailwind)

```typescript
// Hook usage
const isMobile = useIsMobile();           // < 768px
const isTablet = useIsTablet();           // 768px - 1023px
const isDesktop = useIsDesktop();         // >= 1024px
const isMobileOrTablet = useIsMobileOrTablet(); // < 1024px

// Tailwind classes
<div className="
  grid-cols-1           /* mobile */
  md:grid-cols-2        /* tablet (768px+) */
  lg:grid-cols-4        /* desktop (1024px+) */
">
```

### Touch Targets

```css
/* Minimum touch target sizes */
.btn {
  min-height: 44px;  /* iOS HIG minimum */
  min-width: 44px;
  padding: 12px 20px;
}

/* Material Design recommendation */
.btn-large {
  min-height: 48px;
}
```

### Common Patterns

```tsx
// Pattern 1: Conditional Rendering (mobile vs desktop)
const isMobile = useIsMobile();

return (
  <div>
    {isMobile ? (
      <MobileCardLayout items={items} />
    ) : (
      <DesktopTableLayout items={items} />
    )}
  </div>
);

// Pattern 2: Responsive Tailwind Classes
return (
  <div className="
    flex flex-col gap-4          /* mobile: vertical stack */
    md:flex-row md:gap-6         /* tablet: horizontal row */
    lg:gap-8                     /* desktop: more gap */
  ">
    <Sidebar />
    <Content />
  </div>
);

// Pattern 3: Hidden on Mobile
return (
  <div>
    <span className="hidden md:inline">Full description text</span>
    <span className="md:hidden">Short text</span>
  </div>
);
```

## 🐛 Common Issues & Solutions

### Issue: TypeScript errors po dodaniu nowego typu

```typescript
// Problem: Import type doesn't exist
import { MyNewType } from '../types';  // ❌ Module not found

// Solution: Dodaj typ do src/types/index.ts
// src/types/index.ts
export interface MyNewType {
  id: string;
  name: string;
}

// Teraz import działa
import { MyNewType } from '../types';  // ✅
```

### Issue: Table nie mieści się na mobile

```tsx
// Problem: <table> overflow
<table className="data-table">...</table>  // ❌ Wychodzi poza ekran

// Solution 1: Horizontal scroll (quick fix)
<div className="overflow-x-auto">
  <table className="data-table">...</table>
</div>

// Solution 2: Card layout (lepsze UX)
const isMobile = useIsMobile();
return isMobile ? <CardLayout /> : <TableLayout />;
```

### Issue: Modal zbyt szeroki na mobile

```tsx
// Problem: Stała szerokość
<div className="w-[600px]">Modal content</div>  // ❌

// Solution: Responsywna szerokość
<div className="w-full max-w-[600px] mx-4 md:mx-auto">
  Modal content
</div>
```

### Issue: Touch target zbyt mały

```tsx
// Problem: < 44px
<button className="p-2">  // ❌ ~32px wysokości
  <Icon size={16} />
</button>

// Solution: min-height 44px
<button className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center">
  <Icon size={16} />
</button>
```

## 📦 Dodawanie Nowych Dependencies

**Przed dodaniem nowej zależności:**

1. Sprawdź czy nie ma już podobnej (np. nie dodawaj `lodash` jeśli używasz `ramda`)
2. Sprawdź bundle size (https://bundlephobia.com)
3. Sprawdź license (MIT/Apache OK, GPL - konsultuj)
4. Sprawdź última aktualizacja (< 1 rok = OK)

**Dodawanie:**

```bash
# Development dependency
npm install -D <package>

# Production dependency
npm install <package>

# Aktualizuj dokumentację
# Dodaj do odpowiedniej sekcji w INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md
```

## 🆘 Potrzebujesz Pomocy?

1. **Sprawdź dokumentację:**
   - [`INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md`](plans/INSTRUKCJE-DOKOŃCZENIA-APLIKACJI.md)
   - [`mobile-first-audit-report.md`](plans/mobile-first-audit-report.md)

2. **Sprawdź istniejący kod:**
   - Szukaj podobnych komponentów
   - Zobacz jak inni rozwiązali podobny problem

3. **Common resources:**
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
   - [React Docs](https://react.dev)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## ✅ Pull Request Checklist

Przed stworzeniem PR upewnij się że:

- [ ] Kod kompiluje się bez błędów (`npm run build`)
- [ ] Brak TypeScript errors
- [ ] Brak `console.log` i debug code
- [ ] Mobile + Desktop testing done
- [ ] Responsive na 375px, 768px, 1024px
- [ ] Touch targets >= 44px (mobile)
- [ ] Loading states implemented
- [ ] Error handling implemented
- [ ] Commit messages w konwencji
- [ ] Komentarze JSDoc dla public API

**PR Description Template:**

```markdown
## Opis zmian
[Co zostało zrobione]

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation

## Checklist
- [ ] Tested on mobile (375px)
- [ ] Tested on tablet (768px)
- [ ] Tested on desktop (1024px+)
- [ ] No TypeScript errors
- [ ] No console.log statements
- [ ] Touch targets >= 44px

## Screenshots
[Screeny mobile + desktop]
```

---

**Happy coding! 🚀**

*Last updated: 14 lutego 2026*
