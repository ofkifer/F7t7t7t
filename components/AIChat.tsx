
import React, { useState, useRef, useEffect } from 'react';
import { getAIHelp } from '../geminiService';

const SUPPORT_DB = "https://visiononesupportbot-default-rtdb.europe-west1.firebasedatabase.app";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot' | 'agent', text: string, timestamp?: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let savedId = localStorage.getItem('vone_chat_id');
    if (!savedId) {
      savedId = 'chat_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('vone_chat_id', savedId);
    }
    setChatId(savedId);
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const syncMessages = async () => {
      try {
        const res = await fetch(`${SUPPORT_DB}/support_chats/${chatId}.json`, {
          cache: 'no-store',
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.messages) {
            // Firebase returns objects with keys, transform to array
            const msgList = Object.values(data.messages) as any[];
            setMessages(msgList);
          }
        }
      } catch (e) {
        // Silent fail for background sync
      }
    };

    syncMessages();
    const interval = setInterval(syncMessages, 4000);
    return () => clearInterval(interval);
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading || !chatId) return;
    
    const userMsgText = input;
    setInput('');
    const newMessage = { role: 'user', text: userMsgText, timestamp: new Date().toISOString() };
    
    try {
      // 1. Speichere Nachricht des Users
      await fetch(`${SUPPORT_DB}/support_chats/${chatId}/messages.json`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage) 
      });

      // 2. Prüfe ob Mitarbeiter aktiv ist
      const statusRes = await fetch(`${SUPPORT_DB}/support_chats/${chatId}/agent_active.json`);
      let agentActive = false;
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        agentActive = !!statusData;
      }

      // 3. Wenn kein Mitarbeiter, antworte mit Bot
      if (!agentActive) {
        setLoading(true);
        const botMsgText = await getAIHelp(userMsgText);
        const botMessage = { role: 'bot', text: botMsgText, timestamp: new Date().toISOString() };
        
        await fetch(`${SUPPORT_DB}/support_chats/${chatId}/messages.json`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(botMessage) 
        });
        setLoading(false);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: 'bot', text: "Die Verbindung zur Datenbank wurde unterbrochen. Bitte lade die Seite neu." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {isOpen ? (
        <div className="glass w-[320px] sm:w-[420px] h-[600px] rounded-[3rem] flex flex-col overflow-hidden shadow-2xl border-indigo-500/30 animate-in slide-in-from-bottom-10 duration-300">
          <div className="p-8 bg-indigo-600 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <i className="fas fa-headset text-white text-sm"></i>
              </div>
              <div>
                <div className="text-[11px] font-black uppercase text-white tracking-widest">Infrastruktur Support</div>
                <div className="text-[8px] font-bold text-indigo-200 uppercase mono">Session: {chatId?.substring(0,8)}</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <i className="fas fa-chevron-down text-lg"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 bg-black/40 scrollbar-hide">
            {messages.length === 0 && (
              <div className="text-center py-20 opacity-30">
                <i className="fas fa-ghost text-4xl mb-6"></i>
                <div className="text-[10px] font-black uppercase tracking-[0.5em]">Chat-Verlauf leer</div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-[11px] font-bold uppercase tracking-wider leading-relaxed ${
                  m.role === 'user' ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white/[0.05] text-slate-300 border border-white/10'
                }`}>
                  {m.role === 'agent' && <div className="text-[7px] text-emerald-400 mb-2">● LIVE MITARBEITER</div>}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-2 rounded-xl"><i className="fas fa-circle-notch animate-spin text-slate-600"></i></div>
              </div>
            )}
          </div>

          <div className="p-6 bg-black/60 border-t border-white/5">
            <div className="flex gap-3">
              <input 
                type="text" placeholder="Stelle eine Frage..." 
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-[11px] font-bold text-white uppercase focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800"
              />
              <button onClick={handleSend} className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-2xl text-white shadow-[0_20px_50px_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95 transition-all relative overflow-hidden"
        >
          <i className="fas fa-comment-dots group-hover:scale-110 transition-transform"></i>
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
        </button>
      )}
    </div>
  );
};

export default AIChat;
