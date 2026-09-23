## 2024-05-15 - Managing AI Generated Text Limits
**Learning:** When AI generates content for platforms with strict length limits (like YouTube descriptions), silent truncation or hidden limits create poor UX and accessibility issues. Screen readers often miss when content becomes invalid due to length.
**Action:** Always pair AI-generated content fields with `aria-live="polite"` character counters and dynamic `aria-invalid` states that visually and semantically warn the user when boundaries are exceeded.

## 2026-09-19 - Native OS File Filtering UX
**Learning:** Relying solely on application-level error handling (like `alert()` for wrong file types) creates a poor and frustrating user experience. Users shouldn't be able to easily make invalid selections in the first place.
**Action:** Always add the `accept` attribute to file inputs to leverage native OS file pickers, naturally guiding the user to the correct files before they even attempt to submit.
## 2024-09-20 - Replace blocking alert() with accessible toast
**Learning:** Native `alert()` dialogs block the UI thread and provide a jarring, unstyled user experience that cannot be customized for accessibility or branding. Users prefer non-blocking notifications.
**Action:** Replace `alert()` calls with accessible, auto-dismissing in-app toast banners (using `role="alert"`) across applications.

## 2026-09-23 - Inline Copy Success Feedback
**Learning:** When users copy AI-generated text, a lack of visual feedback creates uncertainty and forces them to double-check their clipboard. On the other hand, complex notification toasts for a simple copy action can be overly distracting.
**Action:** Implement inline copy buttons that temporarily transform into a success state (icon + text) and auto-revert, providing immediate, localized, and non-intrusive feedback.
