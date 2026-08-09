# AI-Powered Frontend Technical Specification & Accessibility Auditor

A production-grade, accessible web application that analyzes user component requirements, generates WCAG 2.1 AA compliant React/TypeScript code, and dynamically generates interactive state machines and test suites.

## 🚀 Live Demo
- **Live Production URL:** [https://frontend-ai-capstone-five.vercel.app](https://frontend-ai-capstone-five.vercel.app)
- **GitHub Repository:** [https://github.com/naushinalam1105/frontend-ai-capstone](https://github.com/naushinalam1105/frontend-ai-capstone)

---

## 📄 Project Brief

### What problem does it solve?
Frontend developers frequently ship components with severe accessibility (a11y) flaws, missing ARIA state attributes, and unhandled async error states. Standard LLM generators output generic, unstyled, non-accessible React code without structural boundaries. This application solves that by enforcing strict Zod schema validation, automated WCAG AA ARIA pattern injection, and generating production-ready React + TypeScript code alongside unit tests.

### Who is it for?
Frontend engineers, accessibility auditors, and product UI developers building enterprise design systems.

### Why did you choose this idea?
To bridge the gap between AI code generation and production accessibility standards. Instead of generating raw unvetted text, this tool enforces strict schema validation, structured layout outputs, and WCAG AA verification natively.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** Next.js (App Router, Server Actions)
- **Language:** TypeScript (Strict mode enabled, zero `any` escapes)
- **Styling:** Tailwind CSS (Accessible slate palette: `#FAFAFA` background, `#0F172A` text, `#4338CA` indigo accent)
- **State & Validation:** `react-hook-form` + `zod`
- **AI Engine:** Claude API (`claude-3-5-sonnet`) with structured JSON schema constraints
- **Testing:** Vitest + React Testing Library + `@axe-core/react`
- **Deployment & Observability:** Vercel Continuous Deployment

### Architecture Overview
```text
[ User Input / Constraints ] 
            │
            ▼
[ Client Validation (Zod) ] ────(Fail)────► [ Local Accessible Inline Error ]
            │ (Pass)
            ▼
[ Next.js Server Action ] 
            │
            ▼
[ Claude 3.5 API with System Prompt & Step-Decomposition ]
            │
            ├──► (API Error / Timeout) ──► [ Fallback Mock Spec Generator ]
            │
            ▼ (Valid JSON)
[ Rendered Accessible Output Tabs ]
    ├── Tab 1: TypeScript Component Interface
    ├── Tab 2: Accessible React Code (WCAG AA)
    └── Tab 3: Generated Vitest / RTL Suite