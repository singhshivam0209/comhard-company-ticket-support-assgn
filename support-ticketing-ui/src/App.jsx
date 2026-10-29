import React, { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';

// Mock initial data matching the image items
const INITIAL_TICKETS = [
  {
    id: 1,
    ticketKey: 'SUB-00185',
    title: 'All connections have this issue',
    description: 'Clients are unable to connect via standard ports. Raised 50 minutes ago by Arun Dua - Support Free Member.',
    status: 'IN_MONITORING',
    priority: 'HIGH',
    assignee: 'Arun Dua',
    customerName: 'Aankur Medical Technologies',
    timeAgo: '50m ago',
    comments: [
      { id: 101, author: 'Support Bot', message: 'Ticket assigned to Infra Team queue.', createdAt: '45m ago' },
      { id: 102, author: 'Arun Dua', message: 'Investigating gateway timeout logs.', createdAt: '30m ago' }
    ]
  },
  {
    id: 2,
    ticketKey: 'SUB-00189',
    title: 'Server Stuck',
    description: 'Core application instances are hanging under memory spike scenarios during background sync.',
    status: 'IN_MONITORING',
    priority: 'HIGH',
    assignee: 'Kavita Sharma',
    customerName: 'Enterprise Cloud Core',
    timeAgo: '1h ago',
    comments: []
  },
  {
    id: 3,
    ticketKey: 'SUB-00330',
    title: 'Ankush Medical Technologies Portal Error',
    description: 'Dashboard reports 500 error on medical record search index query.',
    status: 'OPEN',
    priority: 'MEDIUM',
    assignee: 'Unassigned',
    customerName: 'Aankur Medical Technologies',
    timeAgo: '2h ago',
    comments: []
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState(1);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleAddComment = (ticketId, message) => {
    const newComment = {
      id: Date.now(),
      author: 'Current Agent',
      message: message,
      createdAt: 'Just now'
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, comments: [...(t.comments || []), newComment] } : t
      )
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      <LeftSidebar activeTab={activeTab} onTabSelect={setActiveTab} />
      <TicketList
        tickets={tickets}
        activeTicketId={selectedTicketId}
        onSelectTicket={setSelectedTicketId}
      />
      <TicketDetail ticket={selectedTicket} onAddComment={handleAddComment} />
    </div>
  );
}