import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TicketItem from './TicketItem';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  client_name?: string;
  created_at: string;
  admin_response?: string;
}

interface TicketListProps {
  tickets: Ticket[];
  onUpdate: () => void;
  isAdmin?: boolean;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onUpdate, isAdmin = false }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onUpdate={onUpdate}
            isAdmin={isAdmin}
            statusIcon={getStatusIcon(ticket.status)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TicketList;