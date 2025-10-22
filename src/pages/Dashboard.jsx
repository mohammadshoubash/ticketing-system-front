import AppLayout from "../layouts/AppLayout.jsx"
import DashboardWidget from "../components/DashboardWidget.jsx"
import Breadcrumb from "../components/Breadcrumb.jsx"
import DashboardFilter from "../components/DashboardFilter.jsx"
import dummydata from "../data/dummydata.json"
import Pagination from "../components/Pagination.jsx"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from "react"
import axios from "axios"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    closed: 0,
    open: 0,
    inprogress: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
          try {
            const token = localStorage.getItem('auth-token');
            const response = await axios.get('http://localhost:8000/api/tickets', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            setTickets(response.data);

            const total = response.data.length;
            const closed = response.data.filter(ticket => ticket.status === 'Closed').length;
            const open = response.data.filter(ticket => ticket.status === 'Open').length;
            const inprogress = response.data.filter(ticket => ticket.status === 'In Progress').length;

            setStats({
              total,
              closed,
              open,
              inprogress
            });
          } catch (error) {
            console.error('Error fetching tickets:', error);
          } finally {
            setLoading(false);
          }
      }

      fetchData();
    }, []
  );

  return (
    <AppLayout>
        <Breadcrumb pageName="Dashboard" />

        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>

        {/* Header */}        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <a href="/create-ticket" className="px-4 py-2 font-bold text-white rounded cursor-pointer primary-btn">Create Ticket</a>
        </div>

        {/* Widgets */}
        <div className="grid max-w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardWidget value={stats.total} title="Total" classes="fa fa-envelope-open-text fa-3x text-blue-500" />
          <DashboardWidget value={stats.open} title="Open" classes="fa fa-ticket fa-3x text-yellow-500" />
          <DashboardWidget value={stats.inprogress} title="In Progress" classes="fa fa-solid fa-spinner fa-3x text-red-500" />
          <DashboardWidget value={stats.closed} title="Closed" classes="fa fa-check-circle fa-3x text-green-500" />
        </div>

        {/* Chart.js */}
        {/* <div className="p-4 mt-6 bg-white shadow-xl h-96 rounded-xl">
          <Line data={ticketData} options={options} />
        </div>
         */}
         
        {/* Filter and Search */}
        <div className="mt-6">
          <DashboardFilter />
        </div>

        {/* Tickets Table */}
        <table className="w-full mt-6 overflow-hidden bg-white shadow-xl table-fixed sm:table-auto rounded-xl">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Country</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="py-4 text-center">Loading tickets...</td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-4 text-center">No tickets found</td>
              </tr>
            ) : (
              tickets.map(ticket => (
                <tr key={ticket.id}>
                  {/* Ticket ID */}
                  <td><b>#{ticket.id}</b></td>
                  {/* Customer Name */}
                  <td>{ticket.form_fields?.customerName || 'N/A'}</td>
                  {/* Ticket Type */}
                  <td>{ticket.type === "voice" ? "Voice" : "Non-Voice"}</td>
                  {/* Ticket Priority */}
                  <td>
                    {ticket.priority === "High" ? <span className="px-4 py-1 text-red-600 bg-red-100 rounded-full">{ticket.priority}</span> :
                    ticket.priority === "Medium" ? <span className="px-4 py-1 text-yellow-600 bg-yellow-100 rounded-full">{ticket.priority}</span> :
                    <span className="px-4 py-1 text-green-600 bg-green-100 rounded-full">{ticket.priority}</span>}
                  </td>
                  {/* Mobile Number */}
                  <td>{ticket.form_fields?.mobileNumber || 'N/A'}</td>
                  {/* Ticket Status */}
                  <td>
                    {ticket.status === "Open" ? <span className="px-4 py-1 text-yellow-600 bg-yellow-100 rounded-full"><i className="fa fa-circle-info"></i> {ticket.status}</span> :
                    ticket.status === "Closed" ? <span className="px-4 py-1 text-green-600 bg-green-100 rounded-full"><i className="fa fa-check-circle"></i> {ticket.status}</span> :
                    ticket.status === "In Progress" ? <span className="px-4 py-1 text-blue-600 bg-blue-100 rounded-full"><i className="fa fa-spinner"></i> {ticket.status}</span> :
                    <span className="px-4 py-1 text-gray-600 bg-gray-100 rounded-full">{ticket.status}</span>}
                  </td>
                  {/* Country */}
                  <td>{ticket.country}</td>
                  {/* Date */}
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  {/* Ticket Comment */}
                  <td className="max-w-full">{ticket.comment}</td>
                  {/* Actions */}
                  <td>
                    <a href={`/ticket/${ticket.id}`} className="px-4 py-2 font-bold text-white rounded primary-btn-outline">
                      <i className="fa fa-eye"></i>
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-2">
          <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log("Go to page:", page)} />
        </div>
    </AppLayout>
  );
}
