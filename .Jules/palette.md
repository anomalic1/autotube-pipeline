## 2024-05-15 - Managing AI Generated Text Limits
**Learning:** When AI generates content for platforms with strict length limits (like YouTube descriptions), silent truncation or hidden limits create poor UX and accessibility issues. Screen readers often miss when content becomes invalid due to length.
**Action:** Always pair AI-generated content fields with `aria-live="polite"` character counters and dynamic `aria-invalid` states that visually and semantically warn the user when boundaries are exceeded.

## 2026-09-19 - Native OS File Filtering UX
**Learning:** Relying solely on application-level error handling (like `alert()` for wrong file types) creates a poor and frustrating user experience. Users shouldn't be able to easily make invalid selections in the first place.
**Action:** Always add the `accept` attribute to file inputs to leverage native OS file pickers, naturally guiding the user to the correct files before they even attempt to submit.
## 2024-09-20 - Replace blocking alert() with accessible toast
**Learning:** Native `alert()` dialogs block the UI thread and provide a jarring, unstyled user experience that cannot be customized for accessibility or branding. Users prefer non-blocking notifications.
**Action:** Replace `alert()` calls with accessible, auto-dismissing in-app toast banners (using `role="alert"`) across applications.

## 2024-10-24 - Safe Default Focus for Destructive Modals
**Learning:** When destructive modals (like a "Delete Session" confirmation) open, screen readers immediately read the title, but might miss critical context if `aria-describedby` isn't used. Furthermore, if a user accidentally double-taps Enter or presses it hastily when a modal appears, mapping default focus to the destructive action causes unintended data loss.
**Action:** Always map the main explanatory paragraph of a modal using `aria-describedby` on the dialog container. Always add `autoFocus` to the "Cancel" or safe default button in destructive modals to prevent accidental execution via rapid keyboard interaction.
