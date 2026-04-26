# SastaDost → Buyhatke-Style UI Overhaul

Transform the current minimal React app into a high-fidelity Buyhatke.com-inspired price comparison engine with modular components, Tailwind CSS, Recharts, skeleton loaders, and full search/sort integration.

---

## Proposed New Folder Structure

```
src/
├── components/
│   ├── ProductCard.jsx       [NEW] — Deal card with score badge, price matrix, CTA
│   ├── PriceHistory.jsx      [NEW] — Recharts line chart with dummy + real data
│   ├── SearchHero.jsx        [NEW] — Full-page hero with search bar + trending chips
│   ├── SkeletonCard.jsx      [NEW] — Shimmer loader placeholder
│   ├── SortDropdown.jsx      [NEW] — Sort by price asc/desc
│   └── Navbar.jsx            [NEW] — Top navigation bar
├── App.jsx                   [MODIFY] — Orchestrates state, fetch, render
├── main.jsx                  [MODIFY] — Add Tailwind base import
└── index.css                 [MODIFY] — Keep only @tailwind directives + custom font
```

> `App.css` will be **deleted** (replaced by Tailwind utility classes).

---

## Proposed Changes

### Phase 0 — Install Dependencies

Install Tailwind CSS v3 + Recharts:
```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install recharts
```

Configure `tailwind.config.js` to scan `./src/**/*.{js,jsx}`.

---

### Phase 1 — Styling Foundation

#### [MODIFY] `src/index.css`
- Replace entire file with `@tailwind base/components/utilities` directives
- Import **Inter** font from Google Fonts

#### [MODIFY] `index.html`
- Update `<title>` to `SastaDost — Pakistan's Best Price Comparison`
- Add meta description for SEO
- Add Google Fonts link for Inter

---

### Phase 2 — Components

#### [NEW] `src/components/Navbar.jsx`
- SastaDost logo (orange accent) + tagline
- Sticky top bar, white background, subtle drop shadow
- Mobile-responsive hamburger (CSS only)

#### [NEW] `src/components/SearchHero.jsx`
- Full-width hero section with a gradient orange→amber background
- Large centered search input with search icon button
- "Trending" chip pills underneath: Samsung Galaxy, Laptops, Headphones, etc.
- Chips trigger search on click

#### [NEW] `src/components/ProductCard.jsx`
The flagship component. Structure:
```
┌─────────────────────────────────┐
│ [Deal Score Badge]  [Store Logo]│
│                                 │
│     [Product Image 200px]       │
│                                 │
│  Product Name (2 lines clamp)   │
│                                 │
│  Price Matrix:                  │
│  • Daraz     Rs. 45,000  ✓ LOW  │
│  • Amazon    Rs. 47,500         │
│                                 │
│  ★ 4.3  (128 reviews)  💰 Save  │
│                                 │
│  [Compare & Buy →]              │
└─────────────────────────────────┘
```
- **Deal Score** (0–100): computed from `(savings / original_price * 100)`, clamped
- **Price Matrix**: renders all platforms; lowest price gets green highlight + checkmark
- **"Compare & Buy" button**: Buyhatke orange (`#FF6600`) with white text, hover scale

#### [NEW] `src/components/PriceHistory.jsx`
- Recharts `LineChart` with `ResponsiveContainer`
- X-axis: last 6 months (Jan–Jun labels)
- Y-axis: price in Rs.
- Uses **dummy data** merged with real `current_price` as the last data point
- Orange line (#FF6600), subtle grid, tooltip on hover
- Collapsible (hidden by default, expands on "View Price History" click)

#### [NEW] `src/components/SkeletonCard.jsx`
- Animated shimmer effect using Tailwind's `animate-pulse`
- Mimics exact layout of `ProductCard` (image box, title lines, price lines, button)

#### [NEW] `src/components/SortDropdown.jsx`
- Select dropdown: `Default | Price: Low to High | Price: High to Low`
- Fires a callback to App.jsx which re-sorts the `results` array in state

---

### Phase 3 — App.jsx Refactor

#### [MODIFY] `src/App.jsx`
- Remove `App.css` import
- Import all new components
- State: `query`, `results`, `loading`, `sortOrder`, `selectedProduct` (for modal/history)
- `handleSearch`: async fetch to `http://localhost:5000/api/search?q={query}`, sets `results`
- `sortedResults`: derived from `results` sorted by `current_price` per `sortOrder`
- Render:
  ```
  <Navbar />
  <SearchHero onSearch={handleSearch} onChipClick={setQuery+handleSearch} />
  {loading && <SkeletonGrid />}           ← 6 SkeletonCards
  {!loading && results.length > 0 && (
    <SortDropdown ... />
    <ResultsGrid>
      {sortedResults.map(item => <ProductCard ... />)}
    </ResultsGrid>
  )}
  ```

---

## Color & Design Tokens (Buyhatke-inspired)

| Token | Value | Use |
|-------|-------|-----|
| Primary Orange | `#FF6600` | CTA buttons, accents |
| Dark Text | `#1A1A1A` | Headings |
| Muted | `#6B7280` | Secondary text |
| Green Lowest | `#16A34A` | Lowest price highlight |
| Card BG | `#FFFFFF` | Card background |
| Page BG | `#F5F5F5` | App background |
| Hero Gradient | `orange-500 → amber-400` | Search hero |

---

## Verification Plan

### Automated
- `npm run dev` — confirm no compile errors
- Browser subagent screenshots of:
  1. Landing page hero
  2. Skeleton shimmer during load
  3. ProductCard grid after results
  4. PriceHistory chart expanded
  5. Sort dropdown working

### Manual
- Test search with real query (`Samsung`) hitting `localhost:5000`
- Confirm sort ascending/descending reorders cards correctly
- Confirm responsive layout at 375px (mobile), 768px (tablet), 1280px (desktop)

---

## Open Questions

> [!IMPORTANT]
> **Tailwind Version**: I'll use **Tailwind CSS v3** (stable, widely compatible with Vite + React). Let me know if you want v4.

> [!NOTE]
> **Price Matrix**: Your current backend returns one product per result row (one store). If a product appears on multiple stores with the same name, the price matrix will show them together. If not, the card will show a single-platform matrix. Is multi-platform grouping needed, or is per-item display fine for now?

> [!NOTE]
> **Price History**: No history endpoint currently exists. I'll use hardcoded dummy data (6-month trend) with `current_price` as the final point. Just say the word when your backend exposes `/api/history/:id` and I'll wire it up.

> [!NOTE]
> **App.css deletion**: I will remove `App.css` entirely. Confirm this is OK.
