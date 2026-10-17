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

## 2024-10-17 - Accessible Disabled States in Mockups
**Learning:** Hardcoding static attributes like `disabled` on interactive elements when building UI mockups or incomplete features often masks underlying dynamic styles (like hover gradients or animations). If developers later simply remove the `disabled` attribute, these styles can be lost or broken, leading to visual regressions.
**Action:** When simulating a disabled state for an incomplete feature (like an unlinked account), always introduce a mock state variable (e.g., `const [isLinked] = useState(false);`) and use conditional rendering to preserve the component's intended dynamic behavior for when it is active. This approach clearly demonstrates the required logic and prevents regressions.
