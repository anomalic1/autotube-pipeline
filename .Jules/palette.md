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

## 2025-02-12 - Sensitive Field Visibility Toggle
**Learning:** Masking sensitive inputs (like API keys) is good for security, but without a way to temporarily view the input, users are forced to re-paste the entire key if they suspect a typo, which is a frustrating experience.
**Action:** Always provide an accessible visibility toggle (like an eye icon button with an `aria-label`) on sensitive input fields to allow users to temporarily unmask and verify the content.
