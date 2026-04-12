export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f1117] flex relative overflow-hidden font-sans antialiased text-slate-200">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0f1117] z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen"></div>
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none opacity-40 mix-blend-screen"></div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
