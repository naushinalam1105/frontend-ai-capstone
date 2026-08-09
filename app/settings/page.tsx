import React from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0F172A] p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
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
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link href="/settings" className="text-indigo-600 font-semibold">
              Settings
            </Link>
            <Link href="/health" className="text-slate-600 hover:text-slate-900 transition-colors">
              Health
            </Link>
          </nav>
        </header>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Configuration</h1>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-semibold text-slate-900">Active AI Model</h2>
              <p className="text-sm text-slate-500 mt-1">Claude 3.5 Sonnet / Resilient Local Spec Engine Fallback</p>
            </div>

            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-sm font-semibold text-slate-900">Accessibility Target Standard</h2>
              <p className="text-sm text-slate-500 mt-1">WCAG 2.1 Level AA Enforced natively via axe-core validation</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">Design System Palette</h2>
              <p className="text-sm text-slate-500 mt-1">Slate Theme (#FAFAFA Background, #0F172A Text, #4338CA Accent)</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}