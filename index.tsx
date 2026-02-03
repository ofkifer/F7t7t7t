
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- DATENBANK & KONFIGURATION ---
const SUPPORT_DB = "https://visiononesupportbot-default-rtdb.europe-west1.firebasedatabase.app";
const ORDER_DB = "https://db--merkez-default-rtdb.europe-west1.firebasedatabase.app";

const PACKAGES = [
  { id: 'starter', name: 'Starter Tier', price: 40, duration: '30 Tage', features: ['1 Gerät gleichzeitig', 'Standard Routing', 'HD Streaming', 'Support via Teams'] },
  { id: 'performance', name: 'Performance Tier', price: 80, duration: '6 Monate', features: ['1 Gerät gleichzeitig', 'Fast Routing', 'FHD Ready', 'Prioritäts-Support'] },
  { id: 'premium', name: 'Yearly Premium', price: 120, duration: '12 Monate', popular: true, features: ['1 Gerät gleichzeitig', 'VIP Routing', 'Standard HD/FHD', 'KEIN 4K UHD'] },
  { id: 'diamond', name: 'Diamond Premium', price: 200, duration: '12 Monate', features: ['2 Geräte gleichzeitig', '4K UHD STABLE', 'Dedicated Node', '12 Monate Laufzeit'] },
  { id: 'black', name: 'Black VIP Tier', price: 300, duration: '12 Monate', features: ['4 Geräte gleichzeitig', 'Private Server Instance', 'Concierge Service', '12 Monate Laufzeit'] }
];

const FAQS = [
  { q: "Brauche ich eine extra Player Lizenz?", a: "Ja. Unsere Infrastruktur stellt den Stream bereit. Player-Apps wie IBO oder VU benötigen eine eigene Lizenz beim jeweiligen Anbieter." },
  { q: "Gibt es Support?", a: "Wir bieten 24/7 Node-Monitoring und Support via Microsoft Teams." },
  { q: "Gleichzeitige Geräte?", a: "Starter bis Premium: 1 Gerät. Diamond: 2 Geräte. Black VIP: bis zu 4 Geräte." }
];

// --- KI SUPPORT SERVICE ---
const aiService = {
  getHelp: async (prompt: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: "Du bist der VONE Support Bot. Antworte kurz, präzise und auf Deutsch." }
      });
      return response.text || "Systemfehler.";
    } catch (e) { return "KI offline."; }
  },
  makeFriendly: async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Verschönere diese Antwort: "${text}"`,
      });
      return response.text || text;
    } catch (e) { return text; }
  }
};

// --- KOMPONENTEN ---

const MetricCard = ({ title, value, unit, icon }: any) => (
  <div className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-indigo-500/20 transition-all group">
    <div className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4 flex items-center gap-3">
      <i className={`fas ${icon} text-indigo-500`}></i> {title}
    </div>
    <div className="text-4xl font-black italic text-white mono">
      {value}<span className="text-sm text-slate-600 ml-1">{unit}</span>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, text }: any) => (
  <div className="glass p-8 rounded-[2.5rem] border-white/5 hover:bg-white/[0.02] transition-all group">
    <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-6">
      <i className={`fas ${icon} text-xl text-indigo-500`}></i>
    </div>
    <h3 className="text-lg font-black uppercase italic text-white mb-3">{title}</h3>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">{text}</p>
  </div>
);

const OrderModal = ({ pkg, onClose }: { pkg: any, onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', infraEmail: '', contactEmail: '', mac: '', key: '', player: 'IBO PLAYER' });
  const [step, setStep] = useState('form');

  const submit = async () => {
    setStep('loading');
    await new Promise(r => setTimeout(r, 2000));
    await fetch(`${ORDER_DB}/bestellungen.json`, { 
      method: 'POST', 
      body: JSON.stringify({ ...form, package: pkg.name, ts: new Date().toISOString() }) 
    });
    setStep('success');
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="glass w-full max-w-xl p-10 rounded-[4rem] border-indigo-500/20 relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white"><i className="fas fa-times text-xl"></i></button>
        
        {step === 'form' ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black uppercase italic text-white">Registry <span className="text-indigo-500">Gate.</span></h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{pkg.name} Tier Configuration</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Alias / Name" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs outline-none focus:border-indigo-500" />
                <input value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} placeholder="Kontakt E-Mail" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs outline-none focus:border-indigo-500" />
              </div>

              {/* DAS GEWÜNSCHTE FELD UNTER DEM NAMEN */}
              <div className="space-y-2">
                <label className="text-[8px] font-black uppercase text-indigo-400 ml-2 tracking-widest">Infrastruktur E-Mail</label>
                <input value={form.infraEmail} onChange={e => setForm({...form, infraEmail: e.target.value})} placeholder="Node-Sync E-Mail (für Cloud)" className="w-full bg-indigo-600/5 border border-indigo-500/30 p-4 rounded-xl text-white text-xs outline-none focus:border-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input value={form.mac} onChange={e => setForm({...form, mac: e.target.value})} placeholder="MAC (aa:bb...)" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs mono" />
                <input value={form.key} onChange={e => setForm({...form, key: e.target.value})} placeholder="Device Key" className="bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs mono" />
              </div>
              
              <select value={form.player} onChange={e => setForm({...form, player: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-xs uppercase font-black">
                <option value="IBO PLAYER">IBO PLAYER</option>
                <option value="VU PLAYER PRO">VU PLAYER PRO</option>
                <option value="OTHER">OTHER GATEWAY</option>
              </select>
            </div>
            
            <button onClick={submit} className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-indigo-500 transition-all">Audit Starten</button>
          </div>
        ) : step === 'loading' ? (
          <div className="py-20 text-center"><i className="fas fa-circle-notch animate-spin text-5xl text-indigo-500 mb-8"></i><div className="text-xl font-black uppercase italic text-white animate-pulse">Syncing Node Cluster...</div></div>
        ) : (
          <div className="py-20 text-center"><i className="fas fa-check-double text-6xl text-emerald-500 mb-8 animate-bounce"></i><div className="text-2xl font-black uppercase italic text-white">Registry Synced!</div></div>
        )}
      </div>
    </div>
  );
};

// --- HAUPT APP ---

const App = () => {
  const [selPkg, setSelPkg] = useState<any>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [metrics, setMetrics] = useState({ ping: 14, nodes: 4202, load: 38 });
  const [setup, setSetup] = useState('firetv');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    const i = setInterval(() => setMetrics(m => ({
      ping: 12 + Math.floor(Math.random() * 5),
      nodes: m.nodes + (Math.random() > 0.5 ? 1 : -1),
      load: 35 + Math.floor(Math.random() * 10)
    })), 3000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-screen bg-[#000205] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 py-6 px-6">
        <div className="max-w-7xl mx-auto glass p-4 rounded-2xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-indigo-600/30">V1</div>
            <span className="text-[9px] font-black uppercase tracking-widest hidden md:block text-slate-4