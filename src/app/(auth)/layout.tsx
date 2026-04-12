export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden font-sans antialiased text-slate-900">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
