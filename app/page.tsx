export default async function HealthPage() {
  let statusData = { status: "Offline", ping: "N/A" };
  
  try {
    const response = await fetch('https://httpbin.org/get', { cache: 'no-store' });
    if (response.ok) {
      statusData = { status: "Healthy & Online", ping: "Operational" };
    }
  } catch (error: any) {
    statusData = { status: "Degraded Connection", ping: error.message || "Failed" };
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto mt-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">System Health Status</h1>
        <hr className="border-slate-100 my-4" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Deployment Condition</span>
            <span className="text-lg font-bold text-emerald-600">{statusData.status}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">API Validation Loop</span>
            <span className="text-lg font-mono text-slate-700">{statusData.ping}</span>
          </div>
        </div>
      </div>
    </div>
  );
}