
import React, { useState, useEffect } from 'react';
import { makeFriendly } from '../geminiService';

const SUPPORT_DB = "https://visiononesupportbot-default-rtdb.europe-west1.firebasedatabase.app";

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'config' | 'faqs' | 'users'>('chats');
  const [chats, setChats] = useState<any>({});
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [botKnowledge, setBotKnowledge] = useState('');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch(`${SUPPORT_DB}/support_chats.json`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data) setChats(data);
        }
      } catch (e) {
        console.warn("Could not sync chats in admin view.");
      }
    };

    fetchChats();
    const interval = setInterval(fetchChats, 5000);

    fetch(`${SUPPORT_DB}/config/bot_knowledge.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setBotKnowledge(d || ''))
      .catch(() => {});

    return () => clearInterval(interval);
  }, []);

  const handleSendReply = async () => {
    if (!activeChatId || !replyText.trim()) return;
    setIsProcessing(true);
    
    try {
      const polishedText = await makeFriendly(replyText);
      const newMessage = {
        role: 'agent',
        text: polishedText,
        timestamp: new Date().toISOString()
      };

      await fetch(`${SUPPORT_DB}/support_chats/${activeChatId}/messages.json`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage) 
      });
      
      await fetch(`${SUPPORT_DB}/support_chats/${activeChatId}/agent_active.json`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(true) 
      });

      setReplyText('');
    } catch (err) {
      alert("Fehler beim Senden der Antwort. Bitte Internetverbindung prüfen.");
    } finally {
      setIsProcessing(false);
    }
  };

  const saveBotKnowledge = async () => {
    try {
      const res = await fetch(`${SUPPORT_DB}/config/bot_knowledge.json`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(botKnowledge) 
      });
      if (res.ok) alert("Bot-Wissen wurde im Cloud-Speicher aktualisiert!");
    } catch (err) {
      alert("Fehler beim Speichern.");
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-[#00040a] flex flex-col font-sans text-white animate-in fade-in">
      {/* Header */}
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="bg-indigo-600 px-4 py-2 rounded-lg font-black italic text-xs shadow-lg">VONE ADMIN</div>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <nav className="flex gap-8">
            {['chats', 'config', 'faqs', 'users'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)}
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-indigo-500' : 'text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-all"><i className="fas fa-times text-xl"></i></button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'chats' && (
          <>
            <div className="w-80 border-r border-white/5 overflow-y-auto bg-black/20">
              <div className="p-6 border-b border-white/5 text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">Live-Sitzungen</div>
              {Object.keys(chats).length > 0 ? Object.keys(chats).map(id => (
                <button 
                  key={id} 
                  onClick={() => setActiveChatId(id)}
                  className={`w-full p-6 text-left border-b border-white/5 hover:bg-white/[0.02] transition-all ${activeChatId === id ? 'bg-indigo-600/10 border-r-2 border-r-indigo-500' : ''}`}
                >
                  <div className="text-[10px] font-black uppercase text-white mb-1 truncate">User: {id.substring(5, 11)}</div>
                  <div className="text-[8px] font-bold text-slate-500 uppercase">ID: {id}</div>
                </button>
              )) : (
                <div className="p-10 text-center opacity-20 text-[10px] font-black uppercase">Warte auf Verbindung...</div>
              )}
            </div>

            <div className="flex-1 flex flex-col bg-[#050508]">
              {activeChatId ? (
                <>
                  <div className="flex-1 p-10 overflow-y-auto space-y-6">
                    {chats[activeChatId]?.messages ? Object.values(chats[activeChatId].messages).map((m: any, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[70%] p-6 rounded-3xl text-[11px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-white/5 border border-white/10' : 'bg-indigo-600 shadow-xl'}`}>
                          {m.text}
                        </div>
                      </div>
                    )) : (
                      <div className="text-center opacity-20 py-20 text-[10px] font-black uppercase italic">Verbindung hergestellt. Warte auf User...</div>
                    )}
                  </div>
                  <div className="p-8 border-t border-white/5 bg-black/40">
                    <div className="flex gap-4">
                      <textarea 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Deine Antwort eingeben..."
                        className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-[12px] text-white focus:outline-none focus:border-indigo-500 h-24 resize-none transition-all"
                      />
                      <button 
                        onClick={handleSendReply}
                        disabled={isProcessing}
                        className="bg-indigo-600 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50 shadow-lg"
                      >
                        {isProcessing ? <i className="fas fa-spinner animate-spin"></i> : 'Friendly Reply'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600">
                  <i className="fas fa-comments text-5xl mb-6 opacity-20"></i>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em]">Terminal bereit für Support</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'config' && (
          <div className="flex-1 p-20 max-w-4xl mx-auto space-y-12 overflow-y-auto">
            <div className="space-y-4">
              <h3 className="text-2xl font-black uppercase italic">Bot <span className="text-indigo-500">Knowledge Control</span></h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Wichtig: Alle Informationen hier werden dem Gemini-Bot bei jeder Anfrage als Kontext gesendet.</p>
              <textarea 
                value={botKnowledge}
                onChange={(e) => setBotKnowledge(e.target.value)}
                className="w-full h-80 bg-white/[0.03] border border-white/10 rounded-3xl p-10 text-[13px] text-slate-300 focus:outline-none focus:border-indigo-500 transition-all leading-relaxed"
                placeholder="Beispiel: Aktuelle Wartung am Frankfurt-Node von 20:00 bis 22:00 Uhr..."
              />
              <button onClick={saveBotKnowledge} className="bg-indigo-600 px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20">
                Wissen in Cloud sichern
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
