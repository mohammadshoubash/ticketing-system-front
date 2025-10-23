import AppLayout from '../layouts/AppLayout.jsx'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TicketDetails() {
  const {id} = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [comment, setComment] = useState('');

  const fetchTicket = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tickets/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      setTicket(response.data);
    } catch (err) {
      setError('Failed to load ticket');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    setActionLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/resolve`, {
        comment: comment || null
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      await fetchTicket(); // Refresh ticket data
      setComment('');
      alert('Ticket resolved successfully');
    } catch (err) {
      alert('Failed to resolve ticket: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleClose = async () => {
    setActionLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/close`, {
        comment: comment || null
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      await fetchTicket(); // Refresh ticket data
      setComment('');
      alert('Ticket closed successfully');
    } catch (err) {
      alert('Failed to close ticket: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleReopen = async () => {
    setActionLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/reopen`, {
        comment: comment || null
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      await fetchTicket(); // Refresh ticket data
      setComment('');
      alert('Ticket reopened successfully');
    } catch (err) {
      alert('Failed to reopen ticket: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <Breadcrumb pageName="Details" />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading ticket details...</div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Breadcrumb pageName="Details" />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </AppLayout>
    );
  }

  if (!ticket) {
    return (
      <AppLayout>
        <Breadcrumb pageName="Details" />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Ticket not found</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Breadcrumb pageName="Details" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ticket #{id} - {ticket.title}</h1>
      </div>

      <div className="p-6 space-y-6 bg-white shadow-xl rounded-xl">
        {/* Customer Info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{ticket.user?.name || 'Unknown User'}</p>
            <p className="text-sm text-gray-500">{ticket.user?.email || 'No email'}</p>
          </div>
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
              ticket.status === 'Closed' ? 'bg-green-100 text-green-800' :
              ticket.status === 'Resolved' ? 'bg-blue-100 text-blue-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {ticket.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Priority:</span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
              ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {ticket.priority}
            </span>
          </div>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <p className="text-sm text-gray-900">{ticket.type}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Language:</span>
            <p className="text-sm text-gray-900">{ticket.language}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Country:</span>
            <p className="text-sm text-gray-900">{ticket.country}</p>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <span className="text-sm font-medium text-gray-700">Created At:</span>
            <p className="text-sm text-gray-900">{new Date(ticket.created_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Comment */}
        <div>
          <span className="text-sm font-medium text-gray-700">Comment:</span>
          <p className="p-3 mt-1 text-sm text-gray-900 rounded-lg bg-gray-50">{ticket.comment || 'No comment'}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
            <button
              onClick={handleResolve}
              disabled={actionLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {actionLoading ? 'Resolving...' : 'Resolve'}
            </button>
          )}

          {ticket.status !== 'Closed' && (
            <button
              onClick={handleClose}
              disabled={actionLoading}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? 'Closing...' : 'Close'}
            </button>
          )}

          {ticket.status === 'Closed' && (
            <button
              onClick={handleReopen}
              disabled={actionLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {actionLoading ? 'Reopening...' : 'Reopen'}
            </button>
          )}
        </div>

        {/* Comment Input for Actions */}
        {(ticket.status !== 'Resolved' && ticket.status !== 'Closed') || ticket.status === 'Closed' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Add Comment (Optional):</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Add a comment for this action..."
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}
