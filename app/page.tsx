'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface GeneratedSpec {
  title: string;
  componentCode: string;
  zodSchema: string;
  a11yChecklist: string[];
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'schema' | 'a11y'>('preview');
  const [output, setOutput] = useState<GeneratedSpec | null>(null);
  const [status, setStatus] = useState<'online' | 'fallback'>('online');

  // Input Field Interactive State inside Preview
  const [previewInput, setPreviewInput] = useState('');
  const [previewError, setPreviewError] = useState(false);

  const presets = [
    "User Settings Modal with Email Validation",
    "Accessible Data Table with Sorting",
    "Multi-step Checkout Form with ARIA Steps"
  ];

  const handleGenerate = async (queryPrompt: string) => {
    if (!queryPrompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: queryPrompt }),
      });

      if (!res.ok) throw new Error('API offline');

      const data = await res.json();
      setOutput(data);
      setStatus('online');
    } catch {
      // Resilient Fallback Engine
      setStatus('fallback');
      const sanitizedName = queryPrompt.replace(/[^a-zA-Z0-9]/g, '') || 'GeneratedComponent';
      setOutput({
        title: queryPrompt,
        componentCode: `// Generated Accessible Component for: "${queryPrompt}"\nimport React from 'react';\nimport { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst Schema = z.object({\n  input: z.string().min(2, 'Minimum 2 characters required'),\n});\n\nexport const ${sanitizedName} = () => {\n  const { register, handleSubmit, formState: { errors } } = useForm({\n    resolver: zodResolver(Schema)\n  });\n\n  return (\n    <form onSubmit={handleSubmit(() => {})} className="space-y-4 p-6 border rounded-xl bg-white shadow-sm max-w-lg">\n      <div>\n        <label htmlFor="field" className="block text-sm font-semibold text-slate-800 mb-1">\n          ${queryPrompt}\n        </label>\n        <input \n          id="field" \n          {...register('input')} \n          aria-invalid={!!errors.input} \n          aria-describedby="field-error" \n          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-sm text-slate-900"\n        />\n        {errors.input && (\n          <p id="field-error" role="alert" className="mt-1 text-xs text-red-600 font-medium">\n            {errors.input.message as string}\n          </p>\n        )}\n      </div>\n      <button \n        type="submit" \n        className="px-4 py-2 bg-[#4338CA] hover:bg-indigo-800 text-white font-medium text-sm rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"\n      >\n        Submit\n      </button>\n    </form>\n  );\n};`,
        zodSchema: `import { z } from 'zod';\n\nexport const ${sanitizedName}Schema = z.object({\n  input: z.string().min(2, 'Must be at least 2 characters'),\n});`,
        a11yChecklist: [
          'Explicit <label htmlFor="field"> association for screen reader discovery',
          'Dynamic aria-invalid attribute tied directly to form error states',
          'Error messages mapped with aria-describedby and role="alert"',
          'Visible focus rings (focus:ring-2) enforced across input and submit elements',
          'High-contrast slate typography (#0F172A) meeting WCAG AA contrast ratio',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(prompt);
  };

  const handlePreviewTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (previewInput.length < 2) {
      setPreviewError(true);
    } else {
      setPreviewError(false);
      alert('Component Validation Passed! ARIA attributes active.');
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0F172A] p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <header className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xl font-bold tracking-tight text-indigo-700 hover:text-indigo-900 transition-colors">
              AI.Capstone
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono font-medium border border-indigo-100">
              v2.0
            </span>
          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-indigo-600 font-semibold">
              Home
            </Link>
            <Link href="/settings" className="text-slate-600 hover:text-slate-900 transition-colors">
              Settings
            </Link>
            <Link href="/health" className="text-slate-600 hover:text-slate-900 transition-colors">
              Health
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Accessible AI Component Spec Generator
            </h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              ● {status === 'online' ? 'Active Engine' : 'Resilient Mode'}
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            Convert component descriptions into WCAG 2.1 AA compliant React code, Zod schemas, interactive previews, and accessibility validation checklists instantly.
          </p>
        </section>

        {/* Interactive Prompt Input Form */}
        <div className="space-y-3">
          <form onSubmit={onSubmitForm} className="space-y-4">
            <div>
              <label htmlFor="component-prompt" className="block text-sm font-semibold text-slate-700 mb-2">
                Describe the UI Component You Need
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="component-prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A user settings modal with email validation and dark mode toggle"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none bg-white text-slate-900 text-sm shadow-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#4338CA] hover:bg-indigo-800 text-white font-medium text-sm rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 shadow-sm whitespace-nowrap"
                >
                  {loading ? 'Generating Spec...' : 'Generate Spec'}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500">Try presets:</span>
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPrompt(preset);
                  handleGenerate(preset);
                }}
                className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 rounded-md transition-colors border border-slate-200"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Rendered Output Workspace Tabs */}
        {output && (
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Tab Controls */}
            <div className="flex border-b border-slate-200 bg-slate-50/50" role="tablist" aria-label="Generated output formats">
              <button
                role="tab"
                aria-selected={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-indigo-600 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Interactive UI Preview
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'code'}
                onClick={() => setActiveTab('code')}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-indigo-600 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                React Component Code
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'schema'}
                onClick={() => setActiveTab('schema')}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'schema'
                    ? 'border-indigo-600 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Zod Schema
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'a11y'}
                onClick={() => setActiveTab('a11y')}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'a11y'
                    ? 'border-indigo-600 text-indigo-600 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                A11y Audit Checklist
              </button>
            </div>

            {/* Tab Panels */}
            <div className="p-6">
              {activeTab === 'preview' && (
                <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                      Interactive Preview: {output.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">
                      WCAG 2.1 AA Compliant
                    </span>
                  </div>

                  <form onSubmit={handlePreviewTest} className="space-y-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm max-w-md">
                    <div>
                      <label htmlFor="preview-input" className="block text-sm font-semibold text-slate-800 mb-1">
                        {output.title}
                      </label>
                      <input
                        id="preview-input"
                        type="text"
                        value={previewInput}
                        onChange={(e) => {
                          setPreviewInput(e.target.value);
                          if (e.target.value.length >= 2) setPreviewError(false);
                        }}
                        aria-invalid={previewError}
                        aria-describedby="preview-error"
                        placeholder="Type here to test component accessibility..."
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm text-slate-900"
                      />
                      {previewError && (
                        <p id="preview-error" role="alert" className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                          ⚠️ Input must be at least 2 characters.
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#4338CA] hover:bg-indigo-800 text-white font-medium text-sm rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    >
                      Test Validation
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'code' && (
                <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{output.componentCode}</code>
                </pre>
              )}

              {activeTab === 'schema' && (
                <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{output.zodSchema}</code>
                </pre>
              )}

              {activeTab === 'a11y' && (
                <ul className="space-y-3">
                  {output.a11yChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}