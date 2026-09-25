## 2024-05-15 - Managing AI Generated Text Limits
**Learning:** When AI generates content for platforms with strict length limits (like YouTube descriptions), silent truncation or hidden limits create poor UX and accessibility issues. Screen readers often miss when content becomes invalid due to length.
**Action:** Always pair AI-generated content fields with `aria-live="polite"` character counters and dynamic `aria-invalid` states that visually and semantically warn the user when boundaries are exceeded.

## 2026-09-19 - Native OS File Filtering UX
**Learning:** Relying solely on application-level error handling (like `alert()` for wrong file types) creates a poor and frustrating user experience. Users shouldn't be able to easily make invalid selections in the first place.
**Action:** Always add the `accept` attribute to file inputs to leverage native OS file pickers, naturally guiding the user to the correct files before they even attempt to submit.
## 2024-09-20 - Replace blocking alert() with accessible toast
**Learning:** Native `alert()` dialogs block the UI thread and provide a jarring, unstyled user experience that cannot be customized for accessibility or branding. Users prefer non-blocking notifications.
**Action:** Replace `alert()` calls with accessible, auto-dismissing in-app toast banners (using `role="alert"`) across applications.
## 2023-10-27 - Explicit Copy Actions for AI Content
**Learning:** For generative AI tools, especially when publishing pipelines are disconnected or mock, providing explicit, one-click copy actions for generated long-form text (like SEO descriptions) is a critical utility. Users shouldn't have to manually select and copy large blocks of text from custom scrollbar textareas.
**Action:** Always include a "Copy to Clipboard" utility button (with visual feedback) next to headers for AI-generated text blocks, ensuring they are screen-reader accessible and keyboard navigable.
