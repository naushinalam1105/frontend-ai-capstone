import '@/app/globals.css';

export const metadata = {
  title: 'Frontend AI Capstone Skeleton',
  description: 'Deployed and active',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {/* Responsive Navbar */}
        <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-[1280px] min-w-[375px] mx-auto px-4 h-16 flex items-center justify-between">
            <span className="font-bold tracking-tight text-indigo-600">AI.Capstone</span>
            <nav className="flex space-x-6 text-sm font-medium text-slate-600">
              <a href="/" className="hover:text-indigo-600 transition">Home</a>
              <a href="/settings" className="hover:text-indigo-600 transition">Settings</a>
              <a href="/health" className="hover:text-indigo-600 transition">Health</a>
            </nav>
          </div>
        </header>

        {/* Core Main Viewport Container */}
        <main className="flex-grow max-w-[1280px] min-w-[375px] w-full mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}