## 2024-05-15 - Managing AI Generated Text Limits
**Learning:** When AI generates content for platforms with strict length limits (like YouTube descriptions), silent truncation or hidden limits create poor UX and accessibility issues. Screen readers often miss when content becomes invalid due to length.
**Action:** Always pair AI-generated content fields with `aria-live="polite"` character counters and dynamic `aria-invalid` states that visually and semantically warn the user when boundaries are exceeded.

## 2026-09-19 - Native OS File Filtering UX
**Learning:** Relying solely on application-level error handling (like `alert()` for wrong file types) creates a poor and frustrating user experience. Users shouldn't be able to easily make invalid selections in the first place.
**Action:** Always add the `accept` attribute to file inputs to leverage native OS file pickers, naturally guiding the user to the correct files before they even attempt to submit.
## 2024-09-20 - Replace blocking alert() with accessible toast
**Learning:** Native `alert()` dialogs block the UI thread and provide a jarring, unstyled user experience that cannot be customized for accessibility or branding. Users prefer non-blocking notifications.
**Action:** Replace `alert()` calls with accessible, auto-dismissing in-app toast banners (using `role="alert"`) across applications.
## 2024-09-26 - Accessible Clipboard Copy Feedback
**Learning:** Copying large blocks of text (like generated descriptions) without immediate visual feedback leaves users unsure if the action succeeded. Screen reader users also need to know what the button does.
**Action:** Implement a copy button with an `aria-label`, an icon that temporarily changes to a checkmark on success, and use standard clipboard APIs.

## 2024-09-26 - Accessible Clickable Cards with Secondary Actions
**Learning:** Implementing "clickable cards" (where a whole card is a button but also contains secondary buttons like delete) using nested interactive elements or `onClick` on a container `div` is a severe accessibility anti-pattern. Screen readers struggle with nested interactive elements, and valid HTML does not allow buttons inside buttons.
**Action:** Use a non-interactive `relative` container `div`. Place the primary action as an `absolute inset-0` `<button>`. Use `pointer-events-none` on textual content to prevent it from blocking clicks, and set secondary interactive elements (like a delete button) to `relative z-10` so they float above the main card action.

## 2024-09-26 - Accessible Visibility Toggles for Sensitive Information
**Learning:** Users typing sensitive information like API keys or passwords need the ability to visually confirm their input to avoid errors, especially when pasting. Standard password fields hide this input completely. Providing a toggle button increases usability but requires careful accessibility considerations to be usable by screen readers.
**Action:** Always include a visibility toggle for sensitive inputs using an absolutely positioned `<button>` with `type="button"` (to avoid form submission). It must include an `aria-label` that dynamically updates (e.g., "Show API Key" / "Hide API Key") and keyboard accessibility classes (like `focus-visible:ring-2`) to be fully accessible.
