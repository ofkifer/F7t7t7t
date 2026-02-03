
import React from 'react';

const PaymentMethods: React.FC = () => {
  return (
    <section className="py-20 px-6 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.8em] mb-12">Supported Payment Nodes</h3>
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex flex-col items-center gap-3 group">
            <i className="fab fa-paypal text-5xl text-blue-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">PayPal</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <i className="fab fa-bitcoin text-5xl text-orange-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Bitcoin</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <i className="fab fa-ethereum text-5xl text-purple-400 group-hover:scale-110 transition-transform"></i>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Ethereum</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <i className="fas fa-university text-5xl text-emerald-500 group-hover:scale-110 transition-transform"></i>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Bank Sync</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <i className="fab fa-cc-visa text-5xl text-blue-400 group-hover:scale-110 transition-transform"></i>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Visa / Card</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
