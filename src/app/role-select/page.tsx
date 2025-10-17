import React from 'react';
import Link from 'next/link';
import { User, Briefcase } from 'lucide-react';

const RoleSelectPage = () => {
  const heroBgStyle: React.CSSProperties = {
    background:
      "radial-gradient(circle at 88% 8%, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 12%, transparent 36%)," +
      "radial-gradient(circle at 8% 78%, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 24%, transparent 56%)," +
      "linear-gradient(180deg,#000 0%, #000 80%)",
  };

  return (
    <div className="font-sans antialiased text-white bg-black min-h-screen flex items-center justify-center p-4">
      <div aria-hidden className="fixed inset-0 -z-10" style={heroBgStyle}></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pilih Peran Anda</h1>
        <p className="text-lg text-zinc-400 mb-12">Pilih peran Anda untuk melanjutkan ke dashboard yang sesuai.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Role Option */}
          <Link 
            href="/customer" 
            className="group bg-zinc-900/70 border border-zinc-800 rounded-xl p-8 text-left transition-all duration-300 hover:border-purple-500 hover:bg-zinc-800/90 hover:-translate-y-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <User className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold">Customer</h2>
            </div>
            <p className="text-zinc-400">Masuk sebagai pelanggan untuk melihat dan mengelola layanan Anda.</p>
          </Link>
          
          {/* Partner Role Option (Disabled) */}
          <div 
            className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-left opacity-50 cursor-not-allowed"
          >
            <div className="flex items-center gap-4 mb-4">
              <Briefcase className="w-8 h-8 text-zinc-500" />
              <h2 className="text-3xl font-bold">Partner</h2>
            </div>
            <p className="text-zinc-500">Masuk sebagai partner untuk mengelola produk dan layanan Anda. (Segera Hadir)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectPage;