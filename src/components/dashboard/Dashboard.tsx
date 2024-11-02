import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Plus } from "lucide-react";
import TicketModal from "../tickets/TicketModal";
import TicketList from "../tickets/TicketList";
import Header from "../layout/Header";

const Dashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData: any) => {
    try {
      await axios.post("http://localhost:3000/api/tickets", ticketData);
      setIsModalOpen(false);
      fetchTickets();
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Ticket
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="spinner"></div>
              <p className="mt-2 text-sm text-gray-500">Loading tickets...</p>
            </div>
          ) : (
            <TicketList tickets={tickets} onUpdate={fetchTickets} />
          )}
        </div>
      </main>

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};

export default Dashboard;
