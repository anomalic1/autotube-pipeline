## 2024-05-18 - Hidden interactive elements on keyboard navigation
**Learning:** Found a common pattern where buttons are styled with `opacity-0 group-hover:opacity-100` (e.g., the Delete Session trash icon). This hides the button from keyboard users because there is no focus state to make it visible when tabbed into.
**Action:** When encountering `group-hover:opacity-100`, always pair it with `focus-visible:opacity-100` and a visible focus ring (e.g., `focus-visible:ring-2`) so keyboard users can discover and interact with the element.

## 2024-05-18 - Missing destructive action confirmation
**Learning:** Found that deleting a session history item was immediate and irreversible on a single click, which is poor UX for a destructive action.
**Action:** When encountering a destructive action (like delete), always implement a confirmation step (e.g., a modal dialog). The modal must be accessible (`role="dialog"`, `aria-modal="true"`) and support keyboard navigation (Escape to close, proper focus visible styles on buttons).

## 2024-05-19 - Interactive div elements missing keyboard support
**Learning:** Found that custom interactive components (like the Session History card and custom radio buttons) lack keyboard support. Screen readers and keyboard users cannot interact with a `div` or label that only has an `onClick` handler.
**Action:** When building interactive elements without native HTML buttons or inputs, always ensure they are keyboard accessible. Add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for `Enter` and `Space`) for `div`s. For custom radio buttons, use `has-[:focus-visible]` on the parent to visually show focus.

## 2024-05-19 - Accessible AI text output & copy actions
**Learning:** Found that the AI-generated SEO description `textarea` lacked an accessible name, making it difficult for screen readers to identify its purpose, and users had no quick way to copy the large block of generated text.
**Action:** When presenting large blocks of generated text in a `textarea`, always provide an accessible name by tying it to a visible heading (e.g., using `aria-labelledby`). Furthermore, always provide a one-click "Copy" utility button with visual feedback and clear `aria-label`s for both its default and "Copied" states to enhance usability.
