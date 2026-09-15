## 2024-05-18 - Hidden interactive elements on keyboard navigation
**Learning:** Found a common pattern where buttons are styled with `opacity-0 group-hover:opacity-100` (e.g., the Delete Session trash icon). This hides the button from keyboard users because there is no focus state to make it visible when tabbed into.
**Action:** When encountering `group-hover:opacity-100`, always pair it with `focus-visible:opacity-100` and a visible focus ring (e.g., `focus-visible:ring-2`) so keyboard users can discover and interact with the element.

## 2024-05-18 - Missing destructive action confirmation
**Learning:** Found that deleting a session history item was immediate and irreversible on a single click, which is poor UX for a destructive action.
**Action:** When encountering a destructive action (like delete), always implement a confirmation step (e.g., a modal dialog). The modal must be accessible (`role="dialog"`, `aria-modal="true"`) and support keyboard navigation (Escape to close, proper focus visible styles on buttons).

## 2024-05-19 - Interactive div elements missing keyboard support
**Learning:** Found that custom interactive components (like the Session History card and custom radio buttons) lack keyboard support. Screen readers and keyboard users cannot interact with a `div` or label that only has an `onClick` handler.
**Action:** When building interactive elements without native HTML buttons or inputs, always ensure they are keyboard accessible. Add `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler (listening for `Enter` and `Space`) for `div`s. For custom radio buttons, use `has-[:focus-visible]` on the parent to visually show focus.

## 2024-05-19 - Drag and Drop Flickering
**Learning:** Found that implementing a custom drag-and-drop zone using `onDragOver` and `onDragLeave` causes severe flickering. This happens because dragging over child elements fires an `onDragLeave` event for the parent container, rapidly toggling the `isDragging` state.
**Action:** When building custom drag-and-drop zones, wrap the inner visual contents in a container that conditionally applies `pointer-events-none` when `isDragging` is true. This prevents child elements from capturing the drag events while maintaining a smooth experience. Ensure nested interactive elements (like file inputs or buttons) inside the dropzone have `pointer-events-auto` if they need to be clickable while dragging, though typically they don't.
