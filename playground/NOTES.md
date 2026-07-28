# FE-05: Accessible Component Fundamentals - Comparison & Learnings

## Overview
This document compares the custom hand-written implementations of `Modal`, `Tabs`, and `Disclosure` against `shadcn/ui` (built on top of Radix UI primitives).

## Concrete Gaps Between Scratch Implementations and shadcn/ui

1. **Body Scroll Locking and Inert Portals (Modal/Dialog)**
   - **My Version:** Handled focus trapping using DOM queries (`querySelectorAll`) and closed on `Escape`. However, background page content remained scrollable and accessible to screen readers outside the DOM tree.
   - **shadcn/ui:** Renders the dialog via a Portal (`@radix-ui/react-portal`) at the document body root and automatically adds `pointer-events: none` and `aria-hidden="true"` to background body nodes, preventing scroll behavior and background screen reader leaks.

2. **Keyboard Navigation Flexibility & Orientation (Tabs)**
   - **My Version:** Implemented horizontal arrow key navigation (`ArrowLeft`/`ArrowRight`), `Home`, and `End` keys.
   - **shadcn/ui:** Uses Radix's robust state primitives that support both automatic and manual selection modes (`activationMode="automatic | manual"`), along with full support for vertical orientation (`ArrowUp`/`ArrowDown`) and dynamic DOM updates when tabs are dynamically added or removed.

3. **Dynamic Focus Restructuring on Dismount**
   - **My Version:** Restored focus to `previousFocusRef.current` using a basic `useEffect` cleanup function.
   - **shadcn/ui:** Uses a dedicated focus guard stack to safely shift focus to adjacent focusable elements if the trigger element itself was removed or unmounted from the DOM while the dialog was active.