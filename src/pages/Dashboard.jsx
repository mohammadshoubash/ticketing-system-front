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
                <td colSpan="10" className="text-center py-4">Loading tickets...</td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">No tickets found</td>
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
