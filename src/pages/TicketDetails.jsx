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
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">
            <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Breadcrumb pageName="Details" />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </AppLayout>
    );
  }

  if (!ticket) {
    return (
      <AppLayout>
        <Breadcrumb pageName="Details" />
        <div className="flex items-center justify-center h-64">
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
        <div className="flex flex-wrap gap-2">
          {ticket.status !== 'Resolved' && ticket.status !== 'Closed' && (
            <button
              onClick={handleResolve}
              disabled={actionLoading}
              className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50"
            >
              {actionLoading ? 'Resolving...' : 'Resolve'}
            </button>
          )}

          {ticket.status !== 'Closed' && (
            <button
              onClick={handleClose}
              disabled={actionLoading}
              className="px-4 py-2 text-white bg-red-600 rounded cursor-pointer hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? 'Closing...' : 'Close'}
            </button>
          )}

          {ticket.status === 'Closed' && (
            <button
              onClick={handleReopen}
              disabled={actionLoading}
              className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700 disabled:opacity-50"
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
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
              placeholder="Add a comment for this action..."
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}
