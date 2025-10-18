import AppLayout from '../layouts/AppLayout.jsx'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import dummydata from '../data/dummydata.json';

export default function TicketDetails() {
  const {id} = useParams();
  const ticket = dummydata.find(ticket => ticket.id === parseInt(id));

  return (
    <AppLayout>
      <Breadcrumb pageName="Details" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ticket #{id} - {ticket.title}</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-xl space-y-6">
        {/* Customer Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{ticket.customerName}</p>
            <p className="text-sm text-gray-500">{ticket.formFields.mobileNumber}</p>
          </div>
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
              ticket.status === 'Closed' ? 'bg-green-100 text-green-800' :
              ticket.status === 'Unassigned' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <p className="text-sm text-gray-900">{ticket.type}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Department:</span>
            <p className="text-sm text-gray-900">{ticket.department}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Country:</span>
            <p className="text-sm text-gray-900">{ticket.country}</p>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <span className="text-sm font-medium text-gray-700">Created At:</span>
            <p className="text-sm text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Comment */}
        <div>
          <span className="text-sm font-medium text-gray-700">Comment:</span>
          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{ticket.comment}</p>
        </div>
      </div>


    </AppLayout>
  )
}
