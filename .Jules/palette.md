## 2024-05-15 - Managing AI Generated Text Limits
**Learning:** When AI generates content for platforms with strict length limits (like YouTube descriptions), silent truncation or hidden limits create poor UX and accessibility issues. Screen readers often miss when content becomes invalid due to length.
**Action:** Always pair AI-generated content fields with `aria-live="polite"` character counters and dynamic `aria-invalid` states that visually and semantically warn the user when boundaries are exceeded.

## 2026-09-19 - Native OS File Filtering UX
**Learning:** Relying solely on application-level error handling (like `alert()` for wrong file types) creates a poor and frustrating user experience. Users shouldn't be able to easily make invalid selections in the first place.
**Action:** Always add the `accept` attribute to file inputs to leverage native OS file pickers, naturally guiding the user to the correct files before they even attempt to submit.
## 2024-09-20 - Replace blocking alert() with accessible toast
**Learning:** Native `alert()` dialogs block the UI thread and provide a jarring, unstyled user experience that cannot be customized for accessibility or branding. Users prefer non-blocking notifications.
**Action:** Replace `alert()` calls with accessible, auto-dismissing in-app toast banners (using `role="alert"`) across applications.
## 2025-02-14 - Copy to Clipboard for AI-Generated Text
**Learning:** AI-generated text workflows heavily rely on users being able to extract the text quickly, especially when integrations (like "Push to YouTube") are missing, unlinked or disabled. A one-click copy button bridges the workflow gap without requiring complex integrations.
**Action:** Always include a 1-click "Copy" action with visual confirmation for AI-generated content intended for manual extraction or copy-pasting.
