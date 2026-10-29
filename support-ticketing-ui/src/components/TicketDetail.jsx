import React, { useState } from 'react';
import { Clock, Send, Paperclip, CheckSquare, Tag, UserCheck } from 'lucide-react';

export default function TicketDetail({ ticket, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm bg-slate-50">
        Select a ticket from the queue to view details.
      </div>
    );
  }

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(ticket.id, commentText);
    setCommentText('');
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden text-xs">
      {/* Top Detail Header */}
      <div className="h-14 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-700 text-sm">{ticket.ticketKey}</span>
          <span className="text-slate-300">|</span>
          <h2 className="font-semibold text-slate-900 text-sm">{ticket.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2.5 py-1 border border-slate-200 rounded text-slate-700 hover:bg-slate-50 font-medium">
            Edit
          </button>
          <button className="px-2.5 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium">
            Resolve Ticket
          </button>
        </div>
      </div>

      {/* Main content body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Meta details grid */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <span className="text-slate-400 text-[11px] block">Status</span>
            <span className="font-semibold text-slate-800">{ticket.status}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Priority</span>
            <span className="font-semibold text-rose-600">{ticket.priority}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Assignee</span>
            <span className="font-semibold text-slate-800">{ticket.assignee || 'Unassigned'}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Customer / Account</span>
            <span className="font-semibold text-slate-800">{ticket.customerName}</span>
          </div>
        </div>

        {/* Ticket Description */}
        <section>
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
            Description
          </h3>
          <div className="p-4 bg-white border border-slate-200 rounded-md text-slate-700 whitespace-pre-line leading-relaxed">
            {ticket.description}
          </div>
        </section>

        {/* Attachments Section */}
        {ticket.attachments && ticket.attachments.length > 0 && (
          <section>
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
              <Paperclip size={13} /> Attachments ({ticket.attachments.length})
            </h3>
            <div className="flex gap-2">
              {ticket.attachments.map((file, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 cursor-pointer">
                  {file.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Activity & Comments Stream */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Comments & Internal Notes
          </h3>

          <div className="space-y-3">
            {ticket.comments && ticket.comments.map((comment) => (
              <div key={comment.id} className="p-3 border border-slate-100 rounded-md bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800">{comment.author}</span>
                  <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{comment.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Comment Input Footer */}
      <form onSubmit={handleSendComment} className="p-4 border-t border-slate-200 bg-white flex gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Reply to customer or leave an internal note..."
          className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 flex items-center gap-1.5 font-medium transition"
        >
          <Send size={13} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
}