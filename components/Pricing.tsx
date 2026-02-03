
import React from 'react';
import { PACKAGES } from '../constants';
import { Package } from '../types';

interface PricingProps {
  onSelect: (pkg: Package) => void;
}

const Pricing: React.FC<PricingProps> = ({ onSelect }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-black uppercase italic mb-4 text-white">
          Wähle dein <span className="text-indigo-500">Tier.</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">High-Speed Routing. No Contract.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 max-w-[1500px] mx-auto">
        {PACKAGES.map((pkg) => (
          <div 
            key={pkg.id}
            className={`group relative glass p-6 rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-2 ${
              pkg.popular ? 'bg-indigo-600/5 border-indigo-500/40 ring-1 ring-indigo-500/20' : 'hover:border-white/20'
            }`}
          >
            {pkg.popular && (
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">
                Beliebt
              </div>
            )}
            
            <div className="mb-8">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{pkg.name}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white italic tracking-tighter">{pkg.price}€</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">/ {pkg.duration}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-10 flex-grow">
              {pkg.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-[9px] font-bold text-slate-400 uppercase leading-relaxed">
                  <i className={`fas fa-check text-${pkg.color}-500 mt-0.5`}></i>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => onSelect(pkg)}
              className={`w-full py-4 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] transition-all duration-300 ${
                pkg.popular 
                ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              Tier Wählen
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
