
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-2xl p-4 flex justify-between items-center transition-all ${scrolled ? 'shadow-2xl border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black italic shadow-lg shadow-indigo-600/20">V1</div>
            <div className="hidden sm:block">
              <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Global Node</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-bold text-emerald-400 uppercase mono">Operational</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#pricing" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition">Pakete</a>
            <a href="#setup" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition">Setup</a>
            <a href="#faq" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition">FAQ</a>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <button className="bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition">
              <i className="fas fa-satellite-dish text-indigo-400"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
