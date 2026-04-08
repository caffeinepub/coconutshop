# Design Brief: Fresh Tender Coconut E-Commerce

**Visual Direction**: Tropical Fresh Minimalism — clean modern e-commerce with warm organic palette inspired by coconut markets and natural light.

**Tone**: Warm, friendly, premium-casual. Wholesome and natural without corporate sterility.

## Color Palette (OKLCH)

| Name | Light | Dark | Purpose |
|------|-------|------|---------|
| Primary | `0.52 0.14 142` | `0.72 0.12 142` | Tropical green — navigation, CTAs, core actions |
| Secondary | `0.92 0.05 60` | `0.28 0.04 60` | Warm cream — warmth, secondary emphasis |
| Accent | `0.65 0.22 40` | `0.72 0.18 40` | Coral-orange — highlights, playful energy |
| Success | `0.65 0.18 160` | `0.68 0.16 160` | Emerald — order confirmations, growth |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Coral red — remove, danger, delete |
| Background | `0.98 0.02 68` | `0.15 0.02 68` | Clean warmth, natural light |
| Card | `1.0 0 0` | `0.20 0.02 68` | Pure white / dark surface |
| Border | `0.92 0.03 68` | `0.32 0.02 68` | Soft dividers with tropical warmth |

## Typography

| Type | Font | Scale | Weight | Usage |
|------|------|-------|--------|-------|
| Display | Bricolage Grotesque | 32–48px | 700 | Hero, product titles, section heads |
| Body | GeneralSans | 14–16px | 400–500 | Copy, descriptions, UI labels |
| Mono | System | 12–14px | 400 | Code, order IDs, pricing |

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|------------|-----------|---------|
| Header | `primary` | Solid tropical green, white text, 1px border-b | Navigation, branding, tropical anchor |
| Product Grid | `background` | Clean cream-white, cards with soft shadows | Product catalog, visual clarity |
| Product Card | `card` | White with `shadow-warm`, rounded-lg, hover → `shadow-warm-hover` | Individual product display |
| Footer | `muted` | Soft neutral-warm, border-t, centered text | Copyright, links, social |
| Checkout | `secondary` / `background` | Cream warmth, clear form fields, accent CTAs | Payment entry point, trust building |

## Component Patterns

- **Product Cards**: Image (rounded-sm), title (display bold), price (accent color, 16px), "Add to Cart" button (primary filled)
- **Buttons**: Primary (tropical green, white text) for CTAs; Secondary (cream with green border) for alternate; Destructive (coral red) for delete/remove
- **Forms**: Input fields with subtle tropical border, focus ring in primary color
- **Navigation**: Horizontal menu with active state in accent orange, hover underline effect
- **Shopping Cart Icon**: Badge with accent color for item count

## Spacing & Rhythm

- **Density**: Medium — e-commerce requires product-grid clarity, not ultra-dense dashboards
- **Gaps**: 16px between cards, 24px between sections, 32px top/bottom padding on major zones
- **Radius**: 6px (md/default), 4px (sm input fields), full (badges, circular icons)

## Motion & Interaction

- **Transition Smooth**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) on hover/focus states
- **Card Hover**: `shadow-warm` → `shadow-warm-hover` + slight scale lift (not implemented in CSS layer)
- **Button Hover**: Opacity increase to 0.9, smooth shadow transition
- **Cart Update**: Gentle fade-in for new items (delegated to React)

## Signature Detail

Warm tropical shadows on product cards that lift on hover, creating depth without harsh effects. Coral accent bar in header provides distinctive tropical anchor while maintaining clean aesthetics.

## Constraints

- No full-page gradients or heavy decorative elements
- Minimal animation — focus on clarity and performance
- High contrast for text (min WCAG AA)
- Mobile-first responsive design
