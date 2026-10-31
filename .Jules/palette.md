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

## 2024-10-13 - Accessible Destructive Modal Dialogs
**Learning:** Destructive modals (like delete confirmations) present two major accessibility risks: accidental activation of the destructive action upon opening the modal, and lack of context for screen reader users on what is being deleted.
**Action:** Always use `autoFocus` on the safe/cancel action to prevent accidental destructive clicks. Use `aria-describedby` on the dialog container to link it to the description text, ensuring screen reader users get full context without having to navigate to the text manually.

## 2024-10-16 - Accessible Custom Radio Toggles
**Learning:** Building custom UI toggle buttons (acting as radio alternatives) using basic `<button>` tags without correct semantics fails to communicate their relationship and state to assistive technologies. Users with screen readers won't know they are choosing one option from a mutually exclusive set.
**Action:** When building radio-like custom UI toggles, always group the buttons inside a container with `role="radiogroup"` (and an accessible name via `aria-labelledby` or `aria-label`). On the buttons themselves, assign `role="radio"` and dynamically manage the `aria-checked` boolean attribute based on the active selection state.
## 2024-10-18 - Empty States
**Learning:** The session history list disappeared completely when empty, which can be jarring. Empty states with helpful icons and text improve the onboarding flow.
**Action:** Add empty state containers in similar list/history components in the future to encourage user action.

## 2024-10-21 - Accessible Disabled States without CSS Regression
**Learning:** Hardcoding standard `disabled` attributes on custom "mockup" UI buttons or components that depend on hover/focus states can cause regressions because browsers handle disabled element states differently, frequently removing hover animations and standard pseudo-class behavior.
**Action:** When building custom styled buttons or complex interactive components, avoid simply using `disabled=true` if it breaks the intended design or animations. Instead, use a mock state (e.g., `const isLinked = false`), apply conditional CSS classes (like `opacity-50 cursor-not-allowed`), set `aria-disabled={true}` to provide semantic context for assistive tech, use an explanatory `title` tooltip, and intercept clicks (`e.preventDefault()`). This maintains full control over styling while preserving accessibility.
## 2026-10-22 - Dynamic ARIA Feedback and Contextual Labels
**Learning:** Screen reader users require specific context for repetitive UI elements like list item delete buttons. Providing dynamic feedback through updating `aria-label` and using `aria-live` regions significantly improves accessibility for interactive states like copying and loading.
**Action:** Always include item-specific context in `aria-label` for lists. Use `aria-live="polite"` with `role="status"` on loading containers and update ARIA attributes dynamically for interactive feedback buttons.

## 2026-10-25 - Sensitive Input Visibility Toggle
**Learning:** Users often struggle with typos when entering complex, sensitive strings like API keys into standard password fields. The inability to verify their input leads to frustration and unnecessary debugging.
**Action:** For inputs requiring long, sensitive strings (like API keys), provide a toggle button to temporarily switch the input type from `password` to `text`. Ensure this button has a dynamic `aria-label` for screen readers.

## 2026-10-27 - Accessible Modal Focus Management
**Learning:** Modal dialogs can be frustrating for keyboard users if focus isn't immediately managed upon opening, and if standard action buttons lack clear visual focus indicators.
**Action:** Always ensure the primary input element in a modal has `autoFocus` so keyboard users are placed directly into the form context. Furthermore, explicitly add visible focus classes (like `focus-visible:ring`) to all modal action buttons to ensure tab navigation is trackable.

## 2024-11-28 - Contextual Limits in Generated Titles
**Learning:** AI-generated YouTube titles that exceed recommended display limits (usually around 60 characters) can be truncated on various devices, reducing their effectiveness and click-through rate. Users lack context on whether a generated title is within safe limits when selecting one from a list.
**Action:** Provide inline character counts and visual warnings (like turning text orange/red) when generated text like titles exceeds the platform's safe display limits, helping users make informed selections before publishing.
## 2024-05-18 - Copying Text Inside Interactive Labels
**Learning:** When text inside an interactive `<label>` (like a clickable card for a radio button) needs to be copied, providing an explicit "Copy" button is essential. Relying on user text selection inside a label often unintentionally triggers the interactive element (e.g., selecting the radio button) and causes a frustrating user experience.
**Action:** When creating interactive label cards that contain copyable text, always include a dedicated copy button. Ensure the inner text wrapper has `pointer-events-none` so clicks pass through to the label, while the copy button itself uses `relative z-10` with `e.preventDefault()` and `e.stopPropagation()` to handle the copy action without triggering the label selection.
