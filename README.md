# LinkedFusion Campaign Manager — Frontend Task

A pixel-accurate, responsive React implementation of the Figma design for the Intricare Tech frontend assessment: a LinkedIn outreach campaign builder (workflow selection → target audience → sender profiles → settings → stats) plus a campaign listing dashboard.

## Tech Stack

- **React 19 + Vite** — SPA tooling
- **React Router v6** — client-side routing between `/campaign`, `/campaign/new`, `/campaign/:id/stats`
- **Tailwind CSS** — styling, configured with design tokens pulled from the Figma file (colors, fonts, radii, shadows)
- **Recharts** — the campaign overview bar chart on the Stats page
- **lucide-react** — icon set

No backend — all data (campaign list, CSV columns, stats numbers) is static mock data in `src/mock/`.

## Getting Started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
  assets/            # localized images (avatar, empty-state illustration)
  components/
    icons/           # custom icons not covered by lucide-react (e.g. LinkedIn mark)
    layout/          # Sidebar, Navbar, AppShell (route layout)
    ui/              # Button, Input, Select, Card, Modal, Badge, ProgressStepper, AccordionSection
  features/
    campaign-wizard/ # the 4-step "Advance Campaign" wizard + its sub-steps and modals
    campaign-list/   # campaign listing table + empty state
    stats/           # stats dashboard (chart, gauge, activity feed)
  pages/             # route-level composition
  mock/              # static mock data
```

## Notes / Assumptions

- The Figma file did not include a dedicated "Sender Profiles" step screen — it's implemented as a reasonable extension of the existing design system (connected LinkedIn/Email account selector).
- The "TT Fors Trial" logo font from the design is a paid font; a bold system/Google font substitute is used for the wordmark only (body text uses the specified Montserrat).
- Responsive breakpoints (mobile < 640px, tablet 640–1024px, desktop > 1024px) were designed from scratch since the Figma file only provided fixed 1440px desktop frames: the sidebar collapses to a drawer, card grids reflow, and tables scroll horizontally on small screens.
