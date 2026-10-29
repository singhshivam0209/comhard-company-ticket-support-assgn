import React from 'react';
import { 
  Inbox, 
  User, 
  Users, 
  AtSign, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Headphones, 
  Server, 
  ChevronDown 
} from 'lucide-react';

export default function LeftSidebar({ activeTab, onTabSelect }) {
  const navItems = [
    { id: 'ALL', label: 'All', icon: Inbox },
    { id: 'MINE', label: 'Mine', icon: User },
    { id: 'UNASSIGNED', label: 'Unassigned', icon: Users },
    { id: 'MENTIONS', label: 'Mentions', icon: AtSign },
    { id: 'SNOOZED', label: 'Snoozed', icon: Clock },
  ];

  const statuses = [
    { id: 'OPEN', label: 'Open', icon: AlertCircle, color: 'text-amber-500' },
    { id: 'PENDING', label: 'Pending', icon: Clock, color: 'text-blue-500' },
    { id: 'RESOLVED', label: 'Resolved', icon: CheckCircle2, color: 'text-emerald-500' },
  ];

  const teams = [
    { id: 'cust_cloud', label: 'Combined Customer Cloud', icon: Layers },
    { id: 'cust_success', label: 'Customer Success', icon: Headphones },
    { id: 'infra', label: 'Infra Team', icon: Server },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-screen text-xs select-none">
      {/* Brand Header */}
      <div className="h-12 border-b border-slate-200 flex items-center px-4 gap-2 font-semibold text-slate-800">
        <div className="h-6 w-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
          C
        </div>
        <span>Desk Tickets</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Main Inbox section */}
        <section>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Inbox
          </div>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onTabSelect(item.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md font-medium transition ${
                      isActive 
                        ? 'bg-slate-100 text-slate-900 font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-slate-900' : 'text-slate-400'} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Status section */}
        <section>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Status
          </div>
          <ul className="space-y-0.5">
            {statuses.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button 
                    onClick={() => onTabSelect(item.id)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 transition"
                  >
                    <Icon size={14} className={item.color} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Teams section */}
        <section>
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            <span>Teams</span>
            <ChevronDown size={12} />
          </div>
          <ul className="space-y-0.5">
            {teams.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-50 truncate transition">
                    <Icon size={14} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </aside>
  );
}