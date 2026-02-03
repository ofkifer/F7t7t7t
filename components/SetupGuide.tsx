
import React, { useState } from 'react';

const SetupGuide: React.FC = () => {
  const [tab, setTab] = useState<'firetv' | 'ios'>('firetv');

  return (
    <section id="setup" className="py-32 px-6 bg-slate-900/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl md:text-6xl font-black uppercase italic text-white mb-16 leading-none">
          Installation <br/>
          <span className="text-indigo-500">Protocol.</span>
        </h2>
        
        <div className="flex justify-center gap-2 mb-16 p-1.5 glass rounded-2xl max-w-sm mx-auto">
          <button 
            onClick={() => setTab('firetv')}
            className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              tab === 'firetv' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            FireTV / Android
          </button>
          <button 
            onClick={() => setTab('ios')}
            className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              tab === 'ios' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Apple / iOS
          </button>
        </div>

        <div className="space-y-6 animate-fade-in" key={tab}>
          {tab === 'firetv' ? (
            <>
              <Step number="01" title="Entwickler Optionen" text="Einstellungen > Mein Fire TV > Info. Klicken Sie 7 Mal schnell auf den Gerätenamen, bis 'Sie sind ein Entwickler' erscheint." />
              <Step number="02" title="Apps Unbekannter Herkunft" text="Gehen Sie zurück zu Entwickleroptionen und aktivieren Sie 'Apps aus unbekannter Herkunft'." />
              <div className="glass p-10 rounded-[2.5rem] border-l-4 border-indigo-600">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h4 className="text-xl font-black uppercase italic text-white mb-4">03. Downloader Codes</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-loose mb-8">Installieren Sie die App 'Downloader' und geben Sie einen dieser Codes ein:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <CodeBox label="IBO PRO" code="327187" />
                      <CodeBox label="VU PRO" code="7718585" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Step number="01" title="App Store Download" text="Suchen Sie im offiziellen Apple App Store nach 'IBO Player' oder 'UHD IPTV Player' und installieren Sie die App." />
              <Step number="02" title="MAC Identifikation" text="Öffnen Sie die App und notieren Sie sich die Device MAC und den Device Key." />
              <Step number="03" title="Cloud Sync" text="Nutzen Sie unser Formular oben, um Ihre MAC Adresse in unser System einzuspeisen." />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Step: React.FC<{number: string, title: string, text: string}> = ({number, title, text}) => (
  <div className="glass p-8 rounded-[2rem] border-l-4 border-indigo-600 group hover:bg-white/5 transition-all">
    <div className="flex gap-6">
      <div className="text-2xl font-black italic text-indigo-500/30 group-hover:text-indigo-500 transition-colors">{number}</div>
      <div>
        <h4 className="text-lg font-black uppercase italic text-white mb-2">{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-loose tracking-wider">{text}</p>
      </div>
    </div>
  </div>
);

const CodeBox: React.FC<{label: string, code: string}> = ({label, code}) => (
  <div className="bg-black/40 p-5 rounded-2xl text-center border border-white/5 group hover:border-indigo-500/50 transition-all">
    <span className="block text-[9px] text-indigo-400 font-black mb-1 uppercase tracking-widest">{label}</span>
    <span className="text-3xl font-black text-white italic tracking-tighter">{code}</span>
  </div>
);

export default SetupGuide;
