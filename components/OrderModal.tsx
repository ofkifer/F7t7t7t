
import React, { useState, useEffect, useRef } from 'react';
import { Package, OrderData } from '../types';

interface OrderModalProps {
  pkg: Package;
  onClose: () => void;
}

const FIREBASE_URL = "https://db--merkez-default-rtdb.europe-west1.firebasedatabase.app/";

const OrderModal: React.FC<OrderModalProps> = ({ pkg, onClose }) => {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    teamsEmail: '',
    macAddress: '',
    deviceKey: '',
    playerType: 'IBO PLAYER',
    otherPlayerName: '',
    package: pkg.name
  });
  
  const [infraEmail, setInfraEmail] = useState('');
  const [step, setStep] = useState<'form' | 'validating' | 'success'>('form');
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const startProvisioning = async () => {
    if(!formData.name || !infraEmail || !formData.macAddress) {
      alert("BITTE ALLE PFLICHTFELDER AUSFÜLLEN");
      return;
    }

    setStep('validating');
    addLog("INITIALIZING QUANTUM LINK...");
    await new Promise(r => setTimeout(r, 800));
    addLog("AUTHENTICATING AGAINST BACKBONE...");
    await new Promise(r => setTimeout(r, 1200));
    addLog(`PROVISIONING NODE FOR MAC: ${formData.macAddress}`);
    
    const payload = {
      ...formData,
      infraEmail,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(`${FIREBASE_URL}bestellungen.json`, { 
        method: 'POST', 
        body: JSON.stringify(payload) 
      });
      addLog("SYNC COMPLETE. ENCRYPTION KEYS GENERATED.");
      await new Promise(r => setTimeout(r, 1000));
      setStep('success');
      setTimeout(onClose, 3000);
    } catch (e) {
      addLog("CRITICAL ERROR: UPLINK FAILED.");
      setTimeout(() => setStep('form'), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 overflow-y-auto">
      <div className="glass w-full max-w-2xl p-8 md:p-12 rounded-[3.5rem] relative border-indigo-500/30 animate-in zoom-in duration-500 shadow-[0_0_100px_rgba(79,70,229,0.2)]">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-all">
          <i className="fas fa-times text-2xl"></i>
        </button>

        {step === 'form' && (
          <div className="animate-in fade-in duration-700">
            <div className="mb-12 text-center">
              <div className="inline-block px-4 py-1 rounded-full border border-indigo-500/30 text-[8px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4 animate-pulse">Security Level: Alpha</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic text-white leading-none">Registry <span className="text-indigo-500">Node.</span></h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Provisionierung für: {pkg.name}</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); startProvisioning(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Name / Alias</label>
                  <input 
                    type="text" id="name" required placeholder="ALIAS"
                    value={formData.name} onChange={handleInputChange}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white uppercase focus:border-indigo-500 outline-none transition-all shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Infrastruktur E-Mail</label>
                  <input 
                    type="email" required placeholder="NODE-SYNC@CLOUD.COM"
                    value={infraEmail} onChange={(e) => setInfraEmail(e.target.value)}
                    className="w-full px-6 py-5 bg-indigo-600/5 border border-indigo-500/40 rounded-2xl text-xs text-white focus:border-indigo-400 outline-none transition-all shadow-[0_0_20px_rgba(79,70,229,0.1)]" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Teams Kontakt E-Mail</label>
                <input 
                  type="email" id="teamsEmail" required placeholder="DEINE@EMAIL.DE"
                  value={formData.teamsEmail} onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:border-indigo-500 outline-none transition-all" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Device MAC</label>
                  <input 
                    type="text" id="macAddress" required placeholder="AA:BB:CC..."
                    value={formData.macAddress} onChange={handleInputChange}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white mono focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-4 tracking-widest">Device Key</label>
                  <input 
                    type="text" id="deviceKey" required placeholder="KEY"
                    value={formData.deviceKey} onChange={handleInputChange}
                    className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white uppercase focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-7 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 mt-4"
              >
                Deployment Starten <i className="fas fa-rocket ml-2"></i>
              </button>
            </form>
          </div>
        )}

        {step === 'validating' && (
          <div className="py-20 flex flex-col items-center">
            <div className="relative mb-12">
              <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-shield-halved text-2xl text-indigo-500 animate-pulse"></i>
              </div>
            </div>
            <div className="w-full bg-black/50 border border-white/5 rounded-3xl p-8 font-mono text-[10px] text-indigo-400 space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
              {logs.map((log, i) => (
                <div key={i} className="animate-in slide-in-from-left-2">{log}</div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-24 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/50">
              <i className="fas fa-check text-4xl text-emerald-500"></i>
            </div>
            <h2 className="text-5xl font-black uppercase italic text-white mb-4 tracking-tighter">SUCCESFULLY SYNCED.</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Infrastruktur wurde provisioniert.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
