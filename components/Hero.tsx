
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-20">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse-slow [animation-delay:2s]"></div>
        
        {/* Moving Scanline */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400 animate-scan"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-14 animate-in fade-in slide-in-from-bottom-12 duration-1000 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
           <div className="flex gap-1">
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping [animation-delay:0.2s]"></div>
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-300">VONE Quantum Backbone v3.0 Online</span>
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black uppercase italic leading-[0.7] mb-12 tracking-tighter text-white animate-in zoom-in duration-1000">
          NEXT-GEN<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-600 to-purple-600 hover:animate-glitch transition-all cursor-default">CORE.</span>
        </h1>

        <div className="max-w-3xl mx-auto mb-20 px-6">
          <p className="text-[12px] md:text-[14px] font-bold text-slate-400 uppercase tracking-[0.5em] leading-[2] animate-in fade-in duration-1000 delay-500">
            Wir bauen die <span className="text-white">Infrastruktur</span> von morgen. <br className="hidden md:block"/>
            Globales Routing. Militär-Verschlüsselung. <span className="text-indigo-500">Unbegrenzt.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <button 
            onClick={onCtaClick}
            className="group relative px-16 py-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.5em] shadow-[0_30px_70px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">System Konfigurieren</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          <button className="px-16 py-8 glass border-white/10 hover:border-indigo-500/40 text-white rounded-[2.5rem] font-black uppercase text-[12px] tracking-[0.5em] transition-all hover:bg-white/[0.03]">
            Live Metriken
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000vh); }
        }
        .animate-scan { animation: scan 8s linear infinite; }
        @keyframes glitch {
          0% { clip-path: inset(40% 0 61% 0); transform: translate(-5px, -5px); }
          20% { clip-path: inset(92% 0 1% 0); transform: translate(5px, 5px); }
          40% { clip-path: inset(43% 0 1% 0); transform: translate(-5px, 5px); }
          60% { clip-path: inset(25% 0 58% 0); transform: translate(5px, -5px); }
          80% { clip-path: inset(54% 0 7% 0); transform: translate(-5px, -5px); }
          100% { clip-path: inset(58% 0 43% 0); transform: translate(5px, 5px); }
        }
        .hover\:animate-glitch:hover { animation: glitch 0.2s infinite; text-shadow: 3px 0 red, -3px 0 blue; }
      `}</style>
    </section>
  );
};

export default Hero;
