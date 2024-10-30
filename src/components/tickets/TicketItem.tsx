import React, { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { MessageSquare, Trash2 } from 'lucide-react';
import TicketResponseModal from './TicketResponseModal';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  client_name?: string;
  created_at: string;
  admin_response?: string;
}

interface TicketItemProps {
  ticket: Ticket;
  onUpdate: () => void;
  isAdmin: boolean;
  statusIcon: React.ReactNode;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  onUpdate,
  isAdmin,
  statusIcon,
}) => {
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axios.put(`http://localhost:3000/api/tickets/${ticket.id}`, {
        title: ticket.title,
        description: ticket.description,
        status: newStatus,
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const handleResponse = async (response: string) => {
    try {
      await axios.post(`http://localhost:3000/api/tickets/${ticket.id}/response`, {
        response,
      });
      setIsResponseModalOpen(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to respond to ticket:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await axios.delete(`http://localhost:3000/api/tickets/${ticket.id}`);
        onUpdate();
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <li className="hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {statusIcon}
            <p className="ml-2 text-sm font-medium text-gray-900">{ticket.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <>
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={() => setIsResponseModalOpen(true)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              {ticket.description}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <p>
              Created {format(new Date(ticket.created_at), 'MMM d, yyyy')}
              {ticket.client_name && ` by ${ticket.client_name}`}
            </p>
          </div>
        </div>
        {ticket.admin_response && (
          <div className="mt-2 bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              <strong>Admin Response:</strong> {ticket.admin_response}
            </p>
          </div>
        )}
      </div>
      
      <TicketResponseModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        onSubmit={handleResponse}
      />
    </li>
  );
};

export default TicketItem;