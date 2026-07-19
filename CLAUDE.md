# AI Assistant Rules for Frontend Capstone

## Technology Stack
- Frontend: React with JavaScript/TypeScript
- Styling: Tailwind CSS
- Package Manager: npm (Node.js)

## Development Conventions
- Write clean, modular components.
- Use descriptive variable names.
- **Crucial:** Always use Conventional Commits format for Git history (`feat:`, `fix:`, `docs:`, `chore:`).

## Project Engineering Rules
1. **Forms & Validation:** All interactive user forms must be managed using `react-hook-form` and validated strictly against a `zod` schema layout. Uncontrolled inputs are prohibited.
2. **Accessibility Compliance:** Every input field must include a visible `<label>` element containing an explicit, matching `htmlFor` attribute, alongside `aria-describedby` markers for semantic error rendering.
3. **Async State Execution:** Form submission elements must natively manage network execution states, programmatically toggling attributes like `disabled` or `isLoading` to track active submissions.