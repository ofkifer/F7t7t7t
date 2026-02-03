
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Pricing from './components/Pricing';
import OrderModal from './components/OrderModal';
import SetupGuide from './components/SetupGuide';
import AIChat from './components/AIChat';
import PaymentMethods from './components/PaymentMethods';
import CommunityFAQ from './components/CommunityFAQ';
import AdminDashboard from './components/AdminDashboard';
import { Package } from './types';

const App: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleAdminAuth = () => {
    const pass = prompt("ADMIN PROTOCOL ACCESS CODE:");
    if (pass === "admin2024") {
      setIsAdminOpen(true);
    } else {
      alert("ACCESS DENIED.");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#000205] flex flex-col items-center justify-center z-[9999]">
        <div className="text-5xl font-black italic tracking-tighter text-white mb-6">VONE</div>
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 animate-loading-bar"></div>
        </div>
        <style>{`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-loading-bar { animation: loading-bar 1.5s infinite; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000205] selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      <main className="relative">
        <Hero onCtaClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} />
        
        <div className="relative z-10">
          <Dashboard />
          <div id="pricing">
            <Pricing onSelect={handleSelectPackage} />
          </div>
          <PaymentMethods />
          <SetupGuide />
          <CommunityFAQ />
        </div>
      </main>
      
      <footer className="py-24 px-6 border-t border-white/5 bg-black/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="text-4xl font-black italic text-white mb-8 tracking-tighter">VONE <span className="text-indigo-600">INFRA</span></div>
          
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Nodes</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Status</a>
          </div>

          <div className="text-[9px] font-bold text-slate-600 uppercase tracking-[1em] mb-10">© 2026 Core Systems — Quantum Backbone</div>
          
          <div className="flex justify-center gap-8 mb-16">
            <i className="fab fa-discord text-2xl text-slate-500 hover:text-indigo-500 cursor-pointer transition-all hover:scale-110"></i>
            <i className="fab fa-telegram text-2xl text-slate-500 hover:text-sky-500 cursor-pointer transition-all hover:scale-110"></i>
            <i className="fab fa-microsoft text-2xl text-slate-500 hover:text-blue-400 cursor-pointer transition-all hover:scale-110"></i>
          </div>

          <div className="w-full h-[1px] bg-white/5 mb-12"></div>

          {/* New Admin Login Position */}
          <button 
            onClick={handleAdminAuth}
            className="group flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-indigo-600/10 hover:border-indigo-500/30 transition-all duration-500"
          >
            <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-indigo-500 animate-pulse transition-colors"></div>
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-indigo-400 transition-colors">Terminal System Access</span>
          </button>
        </div>
      </footer>

      <AIChat />

      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}

      {isModalOpen && selectedPackage && (
        <OrderModal 
          pkg={selectedPackage} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
