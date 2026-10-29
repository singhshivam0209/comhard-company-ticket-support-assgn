import React from 'react';
import { Search, Plus, Clock, AlertTriangle } from 'lucide-react';

export default function TicketList({ tickets, activeTicketId, onSelectTicket }) {
  return (
    <div className="w-96 border-r border-slate-200 bg-white flex flex-col h-screen">
      {/* Top action header */}
      <div className="p-3 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 text-sm">Tickets</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
              {tickets.length}
            </span>
          </div>
          <button className="flex items-center gap-1 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition">
            <Plus size={14} />
            <span>New Ticket</span>
          </button>
        </div>

        {/* Quick status counters */}
        <div className="flex gap-4 text-xs border-b border-slate-100 pb-2 text-slate-500 font-medium">
          <span className="text-slate-900 border-b-2 border-slate-900 pb-1 -mb-[9px] cursor-pointer">
            Open <strong className="font-semibold">{tickets.length}</strong>
          </span>
          <span className="hover:text-slate-900 cursor-pointer">Mine 1</span>
          <span className="hover:text-slate-900 cursor-pointer">Unassigned 2</span>
        </div>

        {/* Search & Filters */}
        <div className="mt-3 relative">
          <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, subject or description..."
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <select className="w-1/2 text-[11px] border border-slate-200 rounded px-1.5 py-1 text-slate-600 bg-white">
            <option>Any priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="w-1/2 text-[11px] border border-slate-200 rounded px-1.5 py-1 text-slate-600 bg-white">
            <option>Any type</option>
            <option>Incident</option>
            <option>Request</option>
          </select>
        </div>
      </div>

      {/* Ticket List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {tickets.map((ticket) => {
          const isSelected = activeTicketId === ticket.id;
          return (
            <div
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className={`p-3 cursor-pointer text-xs transition border-l-2 ${
                isSelected
                  ? 'bg-blue-50/50 border-l-blue-600'
                  : 'hover:bg-slate-50 border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-500">{ticket.ticketKey}</span>
                <span>{ticket.timeAgo}</span>
              </div>
              <h4 className="font-semibold text-slate-800 text-xs truncate mb-1">
                {ticket.title}
              </h4>
              <p className="text-slate-500 line-clamp-2 text-[11px] mb-2 leading-relaxed">
                {ticket.description}
              </p>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium border border-amber-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {ticket.status}
                </span>

                {ticket.priority === 'HIGH' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-rose-600 font-medium">
                    <AlertTriangle size={11} /> High SLA
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}