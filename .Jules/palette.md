## 2024-05-18 - Hidden interactive elements on keyboard navigation
**Learning:** Found a common pattern where buttons are styled with `opacity-0 group-hover:opacity-100` (e.g., the Delete Session trash icon). This hides the button from keyboard users because there is no focus state to make it visible when tabbed into.
**Action:** When encountering `group-hover:opacity-100`, always pair it with `focus-visible:opacity-100` and a visible focus ring (e.g., `focus-visible:ring-2`) so keyboard users can discover and interact with the element.
