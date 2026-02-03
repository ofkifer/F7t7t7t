
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    users: 82194,
    latency: 11,
    nodes: 542,
    threats: 142
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        users: prev.users + (Math.random() > 0.5 ? 2 : -1),
        latency: 9 + Math.floor(Math.random() * 4),
        nodes: 542,
        threats: prev.threats + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 relative bg-[#020308] overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05),transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12">
          <div className="text-center md:text-left">
            <div className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.8em] mb-4">Live Telemetry</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic text-white tracking-tighter">GLOBAL <span className="text-indigo-500">PULSE.</span></h2>
          </div>
          <div className="px-10 py-5 glass border-emerald-500/20 rounded-3xl flex items-center gap-6 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
            <div className="relative">
              <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full opacity-50"></div>
            </div>
            <div className="text-left">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Backbone Status</div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">High-Efficiency Cluster</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <MetricCard title="Active Nodes" value={metrics.users.toLocaleString()} icon="fa-server" color="indigo" />
          <MetricCard title="Backbone Latency" value={metrics.latency.toString()} icon="fa-bolt" color="emerald" unit="ms" />
          <MetricCard title="Cluster Capacity" value="98.2" icon="fa-microchip" color="purple" unit="%" />
          <MetricCard title="Encrypted Streams" value={metrics.threats.toLocaleString()} icon="fa-lock" color="cyan" />
        </div>

        {/* Improved Terminal Log */}
        <div className="mt-24 p-10 glass border-white/5 rounded-[3.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl text-indigo-500 group-hover:rotate-12 transition-all duration-700">
            <i className="fas fa-terminal"></i>
          </div>
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em] mb-8 flex items-center gap-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span> Terminal System Output
          </div>
          <div className="h-40 overflow-hidden font-mono text-[10px] uppercase tracking-widest text-slate-400 space-y-3 relative">
             <div className="animate-log-scroll">
               <LogLine type="sys" msg="Quantum handshake protocol established with node-eu-west-1" />
               <LogLine type="net" msg="Bypassing regional ISP throttle via adaptive routing" />
               <LogLine type="ok" msg="Encryption keys rotated. New layer: AES-512-VONE" />
               <LogLine type="sys" msg="Global sync 100% complete across 12,402 edge nodes" />
               <LogLine type="sys" msg="Auto-scaling: Provisioning 12 new clusters in Tokyo-02" />
               <LogLine type="net" msg="Latency optimization successful: -3ms for Central Europe" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes log-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-log-scroll { animation: log-scroll 12s linear infinite; }
      `}</style>
    </section>
  );
};

const MetricCard: React.FC<{title: string, value: string, icon: string, color: string, unit?: string}> = ({title, value, icon, color, unit}) => (
  <div className="glass p-12 rounded-[3.5rem] relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-3 border-white/5 hover:border-indigo-500/30">
    <div className={`absolute -top-8 -right-8 p-12 opacity-5 text-9xl text-${color}-500 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12`}>
      <i className={`fas ${icon}`}></i>
    </div>
    <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 mono">{title}</div>
    <div className="text-5xl font-black text-white italic tracking-tighter mono">
      {value}<span className={`text-sm text-${color}-500 ml-1`}>{unit}</span>
    </div>
    <div className="mt-8 flex gap-1 h-6 items-end">
       {[1,2,3,4,5,6].map(i => (
         <div key={i} className={`w-1 rounded-full bg-${color}-500/20 group-hover:bg-${color}-500 transition-all duration-500`} style={{height: `${Math.random() * 100}%`}}></div>
       ))}
    </div>
  </div>
);

const LogLine: React.FC<{type: 'sys'|'net'|'ok', msg: string}> = ({type, msg}) => (
  <div className="flex gap-6 items-start opacity-70 hover:opacity-100 transition-opacity">
    <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
    <span className={`font-black ${type === 'ok' ? 'text-emerald-500' : type === 'net' ? 'text-cyan-500' : 'text-indigo-500'}`}>[{type.toUpperCase()}]</span>
    <span className="text-slate-300">{msg}</span>
  </div>
);

export default Dashboard;
