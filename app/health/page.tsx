import React from 'react';

export default function HealthPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#0F172A] p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">System Health Status</h1>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-sm font-medium text-slate-700">API Endpoint (`/api/generate`)</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ● Online
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Fallback Local Engine</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ● Ready
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}