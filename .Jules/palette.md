## 2024-05-18 - Hidden interactive elements on keyboard navigation
**Learning:** Found a common pattern where buttons are styled with `opacity-0 group-hover:opacity-100` (e.g., the Delete Session trash icon). This hides the button from keyboard users because there is no focus state to make it visible when tabbed into.
**Action:** When encountering `group-hover:opacity-100`, always pair it with `focus-visible:opacity-100` and a visible focus ring (e.g., `focus-visible:ring-2`) so keyboard users can discover and interact with the element.

## 2024-05-18 - Missing destructive action confirmation
**Learning:** Found that deleting a session history item was immediate and irreversible on a single click, which is poor UX for a destructive action.
**Action:** When encountering a destructive action (like delete), always implement a confirmation step (e.g., a modal dialog). The modal must be accessible (`role="dialog"`, `aria-modal="true"`) and support keyboard navigation (Escape to close, proper focus visible styles on buttons).

## 2024-05-19 - Interactive div elements missing keyboard support
**Learning:** Found that custom interactive components (like the Session History card and custom radio buttons) lack keyboard support. Screen readers and keyboard users cannot interact with a `div` or label that only has an `onClick` handler.
**Action:** When building interactive elements without native HTML buttons or inputs, always ensure they are keyboard accessible. Add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for `Enter` and `Space`) for `div`s. For custom radio buttons, use `has-[:focus-visible]` on the parent to visually show focus.

## 2024-05-19 - Missing copy to clipboard action on generated text
**Learning:** Found that the AI-generated description text area required users to manually highlight and copy the text. This is a common pattern for AI output that often needs to be pasted elsewhere, making manual copying tedious and error-prone.
**Action:** When creating text areas for AI-generated text that the user might want to extract, always provide a one-click "Copy to Clipboard" button. Ensure the button provides immediate visual feedback (e.g., swapping the icon and showing a "Copied!" message) and is fully accessible.
