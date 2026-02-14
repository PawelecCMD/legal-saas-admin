# 📱 AUDYT MOBILE-FIRST - Legal SaaS Admin Panel

**Data audytu:** 13 lutego 2026  
**Wersja projektu:** 1.0  
**Audytor:** UX/UI Expert & Frontend Developer

---

## 📋 SPIS TREŚCI

1. [Podsumowanie wykonawcze](#podsumowanie-wykonawcze)
2. [Analiza konfiguracji](#analiza-konfiguracji)
3. [Audyt komponentów Layout](#audyt-komponentów-layout)
4. [Audyt stron administratora](#audyt-stron-administratora)
5. [Audyt stron kancelarii](#audyt-stron-kancelarii)
6. [Audyt stron klienta](#audyt-stron-klienta)
7. [Audyt stron publicznych](#audyt-stron-publicznych)
8. [Priorytetowa lista problemów](#priorytetowa-lista-problemów)
9. [Rekomendacje i poprawki](#rekomendacje-i-poprawki)
10. [Checklista wdrożeniowa](#checklista-wdrożeniowa)

---

## 🎯 PODSUMOWANIE WYKONAWCZE

### Ogólna ocena responsywności: **6.5/10**

| Obszar | Ocena | Status |
|--------|-------|--------|
| Panel Administratora | 6/10 | ⚠️ Wymaga popraw |
| Panel Kancelarii | 6/10 | ⚠️ Wymaga popraw |
| Panel Klienta | 7.5/10 | ✅ Dobry |
| Strony publiczne | 7/10 | ✅ Dobry |
| Nawigacja mobilna | 7/10 | ✅ Dobry |
| Tabele danych | 4/10 | ❌ Krytyczne |
| Formularze | 6/10 | ⚠️ Wymaga popraw |
| Touch targets | 5/10 | ⚠️ Wymaga popraw |

### Główne problemy:
1. **Tabele danych nie są responsywne** - brak horizontal scroll, kolumny ucinane
2. **Brak spójnych breakpointów** w Tailwind config
3. **Touch targets zbyt małe** (< 44px) dla wielu przycisków
4. **Kanban board niewidoczny na mobile** - wymaga scrolla
5. **Modalne okna zbyt szerokie** na małych ekranach
6. **Brak hooka useMediaQuery** dla warunkowego renderowania

---

## ⚙️ ANALIZA KONFIGURACJI

### Tailwind CSS Config ([`tailwind.config.js`](tailwind.config.js))

**❌ PROBLEMY:**

1. **Brak zdefiniowanych breakpointów** - używane są domyślne Tailwind:
   ```javascript
   // Obecnie - brak definicji
   theme: {
     extend: { ... }
   }
   ```

2. **Brak konfiguracji mobile-first**:
   ```javascript
   // Brak:
   screens: {
     'xs': '375px',
     'sm': '640px',
     'md': '768px',
     'lg': '1024px',
     'xl': '1280px',
     '2xl': '1536px',
   }
   ```

**✅ ROZWIĄZANIE:**

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
      colors: { ... },
      fontFamily: { ... },
      spacing: {
        '18': '4.5rem',  // Bottom nav height
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      minHeight: {
        'touch': '44px',  // iOS HIG minimum
        'touch-lg': '48px', // Material Design minimum
      },
    },
  },
  plugins: [],
}
```

---

## 🏗️ AUDYT KOMPONENTÓW LAYOUT

### 1. [`Layout.tsx`](src/components/Layout.tsx) - Panel Administratora

**✅ POZYTYWY:**
- Implementacja mobile menu button
- Overlay dla sidebar na mobile
- Zamykanie sidebar na Escape
- Scroll-to-top button

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 107-135 | Search results dropdown - brak pozycjonowania na mobile | Wysoki |
| 146-167 | User dropdown - może być ucięty na małym ekranie | Średni |
| 177-179 | Scroll-top btn - może kolidować z bottom nav | Niski |

**Szczegóły problemów:**

```tsx
// Linia 107-135: Search dropdown
// PROBLEM: Brak max-height i scroll na mobile
{results.length > 0 && (
  <div className="search-results-overlay">
    // Brak: max-height: 50vh, overflow-y: auto
    // Brak: position: fixed na mobile
  </div>
)}
```

**✅ ROZWIĄZANIE:**

```tsx
// Dodaj do CSS:
.search-results-overlay {
  position: fixed;  // Na mobile
  top: var(--topbar-height);
  left: 0;
  right: 0;
  max-height: 60vh;
  overflow-y: auto;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

@media (min-width: 768px) {
  .search-results-overlay {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    max-height: 400px;
    border-radius: var(--radius-md);
  }
}
```

---

### 2. [`Sidebar.tsx`](src/components/Sidebar.tsx)

**✅ POZYTYWY:**
- Grupowanie nawigacji
- Aktywne stany linków
- Switch role buttons

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 105-111 | Przyciski switch role zbyt małe na mobile | Wysoki |
| 176-205 | Linki sidebar - touch target 36px (min. 44px) | Wysoki |

**✅ ROZWIĄZANIE:**

```css
/* Zwiększ touch targets */
.sidebar-link {
  min-height: 44px;
  padding: 12px 14px;
}

.sidebar-footer button {
  min-height: 44px;
  font-size: 12px;
}
```

---

### 3. [`FirmLayout.tsx`](src/components/FirmLayout.tsx) - Panel Kancelarii

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 118-121 | Search input ukryty na mobile - brak alternatywy | Średni |
| 97-100 | Sidebar footer - brak na mobile | Niski |

**✅ ROZWIĄZANIE:**

```tsx
// Dodaj floating search button na mobile
<button 
  className="mobile-search-fab"
  onClick={() => setIsSearchOpen(true)}
>
  <Search size={20} />
</button>
```

---

### 4. [`ClientLayout.tsx`](src/components/ClientLayout.tsx) - Panel Klienta

**✅ POZYTYWY:**
- Bottom navigation dla mobile (świetne!)
- Mobile sheet dla menu użytkownika
- Desktop nav ukryta na mobile
- Safe area insets

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 75-87 | Bottom nav - 5 elementów może być za ciasne | Średni |
| 102-113 | Sheet actions - przyciski bez min-height | Średni |

**✅ ROZWIĄZANIE:**

```css
/* Poprawa bottom nav */
.client-bottom-link {
  min-height: 56px;  /* Zwiększ z 60px */
  padding: 8px 4px;
}

.client-bottom-link svg {
  width: 20px;
  height: 20px;
}

/* Poprawa sheet actions */
.client-mobile-sheet-actions .btn {
  min-height: 48px;
}
```

---

## 📊 AUDYT STRON ADMINISTRATORA

### 1. [`Dashboard.tsx`](src/pages/Dashboard.tsx)

**✅ POZYTYWY:**
- Użycie Tailwind grid classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- ResponsiveContainer dla wykresów

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 56-69 | Stat cards - 8 kart może być przytłaczające na mobile | Średni |
| 72-116 | Charts grid - 2 kolumny na tablet, 1 na mobile OK | Niski |
| 118-156 | Grid-2 - hardcoded, brak responsywności | Wysoki |

**✅ ROZWIĄZANIE:**

```tsx
// Zamiast:
<div className="grid-2">

// Użyj:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// Dla stat cards - dodaj horizontal scroll na mobile:
<div className="stats-scroll-container">
  <div className="stats-grid">
    {stats.map(...)}
  </div>
</div>

// CSS:
.stats-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.stats-scroll-container::-webkit-scrollbar {
  display: none;
}
```

---

### 2. [`Users.tsx`](src/pages/Users.tsx)

**❌ KRYTYCZNE PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 93-115 | **Tabela całkowicie nieprzystosowana do mobile** | 🔴 KRYTYCZNY |
| 80-92 | Toolbar - elementy mogą się nie mieścić | Wysoki |
| 118-162 | Modal - brak full-screen na mobile | Wysoki |

**Szczegóły tabeli:**

```tsx
// Linia 93-115: Tabela z 7 kolumnami!
<thead>
  <tr>
    <th>Użytkownik</th>
    <th>Rola</th>
    <th>Kancelaria</th>
    <th>Status</th>
    <th>2FA</th>
    <th>Ostatnie logowanie</th>
    <th></th> {/* Akcje */}
  </tr>
</thead>
```

**✅ ROZWIĄZANIE - Card Layout na mobile:**

```tsx
// Dodaj widok kart na mobile
const [view, setView] = useState<'table' | 'cards'>('table');

// CSS media query lub warunkowe renderowanie
{isMobile ? (
  <div className="user-cards">
    {filtered.map(user => (
      <div key={user.id} className="user-card">
        <div className="user-card-header">
          <div className="list-item-avatar">{user.initials}</div>
          <div>
            <div className="user-card-name">{user.name}</div>
            <div className="user-card-email">{user.email}</div>
          </div>
          {statusBadge(user.status)}
        </div>
        <div className="user-card-body">
          <div className="user-card-row">
            <span>Rola:</span>
            <span className="badge badge-purple">{user.role}</span>
          </div>
          <div className="user-card-row">
            <span>Kancelaria:</span>
            <span>{user.lawFirm || '—'}</span>
          </div>
          <div className="user-card-row">
            <span>2FA:</span>
            <span>{user.twoFA ? '✓' : 'Brak'}</span>
          </div>
        </div>
        <div className="user-card-actions">
          <button className="btn btn-ghost btn-sm">
            <Key size={14} /> Reset hasła
          </button>
          <button className="btn btn-ghost btn-sm">
            <History size={14} /> Historia
          </button>
        </div>
      </div>
    ))}
  </div>
) : (
  <table>...</table>
)}
```

**CSS dla kart:**

```css
.user-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  background: var(--bg-card);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  padding: 16px;
}

.user-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-card-name {
  font-weight: 600;
  color: var(--text-primary);
}

.user-card-email {
  font-size: 12px;
  color: var(--text-tertiary);
}

.user-card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-top: 1px solid var(--border-secondary);
  border-bottom: 1px solid var(--border-secondary);
}

.user-card-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.user-card-row span:first-child {
  color: var(--text-tertiary);
}

.user-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

@media (min-width: 768px) {
  .user-cards {
    display: none;
  }
}
```

---

### 3. [`Cases.tsx`](src/pages/Cases.tsx)

**❌ KRYTYCZNE PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 88-124 | **Kanban board - 8 kolumn na mobile!** | 🔴 KRYTYCZNY |
| 126-145 | Tabela z 9 kolumnami | 🔴 KRYTYCZNY |
| 74-86 | Toolbar actions - zbyt wiele elementów | Wysoki |

**✅ ROZWIĄZANIE - Kanban na mobile:**

```tsx
// 1. Dodaj horizontal scroll z snap
.kanban-board {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 16px 16px;
}

.kanban-column {
  min-width: calc(100vw - 48px);  /* Prawie pełna szerokość */
  max-width: 320px;
  scroll-snap-align: center;
  flex-shrink: 0;
}

// 2. Dodaj wskaźnik kolumn
<div className="kanban-indicator">
  {allStatuses.map((status, i) => (
    <div 
      key={status}
      className={`kanban-dot ${currentIndex === i ? 'active' : ''}`}
    />
  ))}
</div>

// 3. Alternatywnie: Accordion view na mobile
{isMobile ? (
  <div className="kanban-accordion">
    {allStatuses.map(status => (
      <details key={status} className="kanban-accordion-item">
        <summary className="kanban-accordion-header">
          <span>{status}</span>
          <span className="badge">{getCount(status)}</span>
        </summary>
        <div className="kanban-accordion-body">
          {/* Karty */}
        </div>
      </details>
    ))}
  </div>
) : (
  <div className="kanban-board">...</div>
)}
```

---

## 🏢 AUDYT STRON KANCELARII

### [`FirmDashboard.tsx`](src/pages/firm/FirmDashboard.tsx)

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 46 | Hardcoded grid: `gridTemplateColumns: '1fr 300px'` | 🔴 KRYTYCZNY |
| 29-44 | Stats grid - 6 kart może wymagać scrolla | Średni |

**✅ ROZWIĄZANIE:**

```tsx
// Zamiast inline style:
<div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>

// Użyj:
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
```

---

## 👤 AUDYT STRON KLIENTA

### [`ClientDashboard.tsx`](src/pages/client/ClientDashboard.tsx)

**✅ POZYTYWY:**
- Dobry layout na mobile
- Odpowiednie odstępy

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 12 | Hardcoded padding: `padding: '32px 24px'` | Niski |
| 23 | Hardcoded grid: `gridTemplateColumns: 'repeat(3, 1fr)'` | Średni |

**✅ ROZWIĄZANIE:**

```tsx
// Zamiast:
<div style={{ padding: '32px 24px' }}>

// Użyj:
<div className="px-4 py-6 md:px-6 md:py-8">

// Zamiast:
<div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>

// Użyj:
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
```

---

## 🔐 AUDYT STRON PUBLICZNYCH

### [`Login.tsx`](src/pages/Login.tsx)

**✅ POZYTYWY:**
- Responsywny layout
- Touch-friendly przyciski
- Overlay na mobile

**❌ PROBLEMY:**

| Linia | Problem | Priorytet |
|-------|---------|-----------|
| 121-127 | Checkbox "Zapamiętaj mnie" - touch target | Średni |
| 109-116 | Eye button - może być za mały | Niski |

**✅ ROZWIĄZANIE:**

```css
/* Zwiększ touch target dla checkboxa */
.checkbox-container {
  min-height: 44px;
  padding: 8px 0;
}

.checkbox-container .checkmark {
  width: 20px;
  height: 20px;
}

/* Eye button */
.input-action-btn {
  min-width: 44px;
  min-height: 44px;
}
```

---

## 🚨 PRIORYTETOWA LISTA PROBLEMÓW

### 🔴 KRYTYCZNE (Natychmiastowa naprawa)

| # | Problem | Plik | Rozwiązanie |
|---|---------|------|-------------|
| 1 | Tabele nieprzystosowane do mobile | Users.tsx, Cases.tsx | Card layout na mobile |
| 2 | Kanban board - 8 kolumn na mobile | Cases.tsx | Horizontal scroll + snap |
| 3 | Hardcoded grid layouts | FirmDashboard.tsx | Tailwind responsive classes |
| 4 | Brak breakpointów w Tailwind | tailwind.config.js | Dodaj konfigurację screens |

### 🟠 WYSOKIE (Naprawa w tym sprincie)

| # | Problem | Plik | Rozwiązanie |
|---|---------|------|-------------|
| 5 | Touch targets < 44px | Sidebar.tsx, Layout.tsx | Zwiększ min-height |
| 6 | Search dropdown ucięty | Layout.tsx | Fixed position na mobile |
| 7 | Modal bez full-screen | Users.tsx, Cases.tsx | Full-screen na mobile |
| 8 | Toolbar overflow | Users.tsx, Cases.tsx | Wrap lub collapse |

### 🟡 ŚREDNIE (Naprawa w kolejnym sprincie)

| # | Problem | Plik | Rozwiązanie |
|---|---------|------|-------------|
| 9 | Bottom nav - 5 elementów | ClientLayout.tsx | Zmniejsz padding/font |
| 10 | Stats grid - za dużo kart | Dashboard.tsx | Horizontal scroll |
| 11 | Search ukryty na mobile | FirmLayout.tsx | FAB search button |

---

## 🛠️ REKOMENDACJE I POPRAWKI

### 1. Utworzenie hooka useMediaQuery

```typescript
// src/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Predefined breakpoints
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
```

### 2. Komponent ResponsiveTable

```tsx
// src/components/ResponsiveTable.tsx
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
              <th key={col.key} className={isMobile && col.mobileHidden ? 'hidden' : ''}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key} className={isMobile && col.mobileHidden ? 'hidden' : ''}>
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

### 3. Komponent MobileModal

```tsx
// src/components/MobileModal.tsx
import { useIsMobile } from '../hooks/useMediaQuery';

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MobileModal({ isOpen, onClose, title, children }: MobileModalProps) {
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isMobile ? 'mobile' : ''}`}>
      <div className={`modal ${isMobile ? 'mobile-modal' : ''}`}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

```css
/* Mobile Modal Styles */
.mobile-modal {
  position: fixed;
  inset: 0;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  border-radius: 0;
  margin: 0;
}

.modal-overlay.mobile {
  padding: 0;
}

.modal-body {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}
```

### 4. Globalne poprawki CSS

```css
/* src/styles/mobile-fixes.css */

/* Touch targets - minimum 44px */
.btn {
  min-height: 44px;
  min-width: 44px;
}

.btn-sm {
  min-height: 36px;
  min-width: 36px;
}

/* Form inputs */
input, select, textarea {
  min-height: 48px;
  font-size: 16px; /* Zapobiega zoom na iOS */
}

/* Tabele - horizontal scroll */
.data-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Ukryj kolumny na mobile */
@media (max-width: 767px) {
  .hide-mobile {
    display: none !important;
  }
  
  /* Pokaż tylko 3-4 najważniejsze kolumny */
  table th:nth-child(n+5),
  table td:nth-child(n+5) {
    display: none;
  }
}

/* Safe area dla iPhone X+ */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .client-bottom-nav {
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
  
  .app-content {
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }
}

/* Poprawa dla 100vh na mobile */
.fill-screen {
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height */
}

/* Zapobieganie zoom na double-tap */
* {
  touch-action: manipulation;
}

/* Smooth scroll */
.scroll-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
```

---

## ✅ CHECKLISTA WDROŻENIOWA

### Faza 1: Krytyczne poprawki (Tydzień 1)

- [ ] Dodać breakpoints do `tailwind.config.js`
- [ ] Utworzyć hook `useMediaQuery.ts`
- [ ] Naprawić tabele w `Users.tsx` - card layout na mobile
- [ ] Naprawić tabele w `Cases.tsx` - card layout na mobile
- [ ] Naprawić Kanban board - horizontal scroll
- [ ] Naprawić hardcoded grids w `FirmDashboard.tsx`

### Faza 2: Touch targets i UX (Tydzień 2)

- [ ] Zwiększyć touch targets w sidebar
- [ ] Naprawić search dropdown na mobile
- [ ] Dodać full-screen modale na mobile
- [ ] Poprawić toolbar overflow
- [ ] Dodać `mobile-fixes.css`

### Faza 3: Optymalizacja (Tydzień 3)

- [ ] Dodać FAB search dla FirmLayout
- [ ] Zoptmalizować stats grid
- [ ] Dodać skeleton loading
- [ ] Testy na urządzeniach fizycznych
- [ ] Audyt Lighthouse mobile

### Faza 4: Testy i dokumentacja

- [ ] Testy na iPhone SE (375px)
- [ ] Testy na iPhone 14 Pro (393px)
- [ ] Testy na iPad Mini (768px)
- [ ] Testy na iPad Pro (1024px)
- [ ] Dokumentacja breakpointów
- [ ] Style guide dla komponentów

---

## 📱 TESTOWANE URZĄDZENIA

| Urządzenie | Rozdzielczość | Status |
|------------|---------------|--------|
| iPhone SE | 375 × 667 | ⚠️ Wymaga testów |
| iPhone 14 Pro | 393 × 852 | ⚠️ Wymaga testów |
| iPhone 14 Pro Max | 430 × 932 | ⚠️ Wymaga testów |
| iPad Mini | 768 × 1024 | ⚠️ Wymaga testów |
| iPad Pro 11" | 834 × 1194 | ⚠️ Wymaga testów |
| Samsung Galaxy S21 | 360 × 800 | ⚠️ Wymaga testów |
| Google Pixel 7 | 412 × 915 | ⚠️ Wymaga testów |

---

## 📚 REFERENCJE

- [Apple Human Interface Guidelines - iOS](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design - Touch targets](https://material.io/design/usability/accessibility.html#layout-and-typography)
- [WCAG 2.1 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Tailwind CSS - Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

*Raport wygenerowany automatycznie przez system audytu Mobile-First.*
