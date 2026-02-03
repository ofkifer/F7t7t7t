
import React, { useState } from 'react';

const FAQS = [
  { q: "Brauche ich eine extra Player Lizenz?", a: "Absolut. Unsere Infrastruktur stellt rein den Content-Stream bereit. Apps wie IBO Player oder VU Player benötigen eine eigene Freischaltung (ca. 7€/Jahr direkt beim App-Anbieter)." },
  { q: "Gibt es Support bei technischen Problemen?", a: "Ja, wir bieten 24/7 Monitoring. Bei persönlichen Anliegen kannst du jederzeit ein Support-Ticket in unserer Microsoft Teams Community eröffnen." },
  { q: "Wie viele Geräte kann ich gleichzeitig nutzen?", a: "Das hängt von deinem gewählten Tier ab: Starter bis Premium unterstützen 1 Gerät. Diamond unterstützt 2 und Black VIP bis zu 4 Geräte gleichzeitig." },
  { q: "Wie funktioniert die Validierung?", a: "Bevor wir deine Bestellung in die Cloud schieben, prüfen wir (simuliert), ob deine MAC bereits auf der Website des App-Herstellers registriert wurde, um Fehler zu vermeiden." },
  { q: "Kann ich die MAC Adresse nachträglich ändern?", a: "Ja, innerhalb der Laufzeit ist ein Wechsel pro Monat kostenlos über den Support möglich." }
];

const CommunityFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 px-6 bg-[#000205] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="text-[10px] font-black uppercase text-indigo-500 tracking-[1em] mb-4">Knowledge Base</div>
          <h2 className="text-4xl md:text-7xl font-black uppercase italic text-white mb-6 leading-none">Community <span className="text-indigo-500">Protocol.</span></h2>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mono max-w-lg mx-auto leading-relaxed">Antworten auf die wichtigsten Fragen zur Einrichtung und zum Betrieb deiner Infrastruktur.</p>
        </div>

        <div className="space-y-5">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-[2.5rem] overflow-hidden border-white/5 transition-all duration-500 hover:border-indigo-500/20 shadow-lg">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-10 flex justify-between items-center text-left transition-colors hover:bg-white/[0.02]"
              >
                <span className="text-[12px] font-black uppercase text-white tracking-[0.15em] leading-relaxed">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full border border-indigo-500/30 flex items-center justify-center text-indigo-500 transition-all duration-500 ${openIdx === i ? 'rotate-180 bg-indigo-500 text-white border-transparent' : ''}`}>
                  <i className="fas fa-chevron-down text-[10px]"></i>
                </div>
              </button>
              <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${openIdx === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-10 pb-10 text-[11px] font-bold text-slate-400 uppercase leading-loose tracking-wider border-t border-white/5 pt-6 bg-black/20 italic">
                  <i className="fas fa-info-circle mr-3 text-indigo-500/50"></i> {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 group glass p-12 rounded-[3.5rem] border-indigo-600/40 flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent hover:shadow-[0_0_50px_rgba(79,70,229,0.15)] transition-all">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black uppercase italic text-white mb-3">Live Support & News</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-sm leading-relaxed">
              Erhalte Echtzeit-Statusupdates, Setup-Hilfe und exklusive Angebote in unserer Microsoft Teams Community.
            </p>
          </div>
          <a href="https://teams.live.com/l/community/FEAnh8L1jzMf2tJ9wQ" target="_blank" className="relative px-12 py-6 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_15px_35px_rgba(79,70,229,0.3)] overflow-hidden">
             <span className="relative z-10">Teams Community <i className="fas fa-external-link-alt ml-2"></i></span>
             <div className="absolute inset-0 bg-white/10 -translate-y-full hover:translate-y-0 transition-transform duration-500"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunityFAQ;
