import React from 'react';
import Link from 'next/link';

export default function HealthPage() {
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
            <Link href="/settings" className="text-slate-600 hover:text-slate-900 transition-colors">
              Settings
            </Link>
            <Link href="/health" className="text-indigo-600 font-semibold">
              Health
            </Link>
          </nav>
        </header>

        <section className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Health Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Primary Route</span>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-slate-800">`/api/generate`</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">● Operational</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase">Resilience Engine</span>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-slate-800">Local Fallback Spec</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">● Ready</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}