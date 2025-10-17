import AppLayout from "../layouts/AppLayout.jsx"
import DashboardWidget from "../components/DashboardWidget.jsx"
import Breadcrumb from "../components/Breadcrumb.jsx"
import DashboardFilter from "../components/DashboardFilter.jsx"
import dummydata from "../data/dummydata.json"

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="bg-green-500 p-6 max-w-full sm:px-6 lg:px-8 w-full">
        <div>
          <Breadcrumb items={[{ label: "Dashboard", href: "#" }]} />
          <div className="flex justify-between items-center mb-6 bg-yellow-500">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <a href="/create-ticket" className="primary-btn text-white font-bold py-2 px-4 rounded cursor-pointer">Create Ticket</a>
          </div>
        </div>

        {/* Widgets */}
        <div className="bg-red-500 max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardWidget value={312} title="Total" classes="fa fa-envelope-open-text fa-3x text-blue-500" />
          <DashboardWidget value={41} title="Open" classes="fa fa-ticket fa-3x text-yellow-500" />
          <DashboardWidget value={41} title="Unassigned" classes="fa fa-xmark-circle fa-3x text-red-500" />
          <DashboardWidget value={22} title="Closed" classes="fa fa-check-circle fa-3x text-green-500" />
        </div>

        {/* Chart.js */}
        
        {/* Filter and Search */}
        <div className="mt-6 bg-blue-500">
          <DashboardFilter />
        </div>


        {/* Tickets Table */}
        <table className="w-full table-fixed sm:table-auto bg-white mt-6 rounded-xl shadow-2xl overflow-hidden">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Status</th>
              <th>Country</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy data */}
            { 
              dummydata.map(ticket => (
                <tr key={ticket.id}>
                  <td><b>#{ticket.id}</b></td>
                  <td>{ticket.customerName}</td>
                  <td>{ticket.type == "voice" ? "Voice" : "Non-Voice"}</td>
                  <td>
                    {ticket.priority == "High" ? <span className="text-red-600 bg-red-100 px-4 py-1 rounded-full border-1">{ticket.priority}</span> : 
                    ticket.priority == "Medium" ? <span className="text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full border-1">{ticket.priority}</span> : 
                    <span className="text-green-600 bg-green-100 px-4 py-1 rounded-full border-1">{ticket.priority}</span>}</td>
                  <td>{ticket.department}</td>
                  <td>{ticket.status == "Open" ? <span className="text-yellow-600 bg-yellow-100 px-4 py-1 rounded-full border-1"><i className="fa fa-circle-info"></i> {ticket.status}</span> : 
                    ticket.status == "Closed" ? <span className="text-green-600 bg-green-100 px-4 py-1 rounded-full border-1"><i className="fa fa-check-circle"></i> {ticket.status}</span> :  
                    ticket.status == "Unassigned" ? <span className="text-red-600 bg-red-100 px-4 py-1 rounded-full border-1">{ticket.status}</span> : 
                    <span className="text-blue-600 bg-blue-100 px-4 py-1 rounded-full border-1"><i className="fa fa-circle-play"></i> {ticket.status}</span>}</td>
                  <td>{ticket.country}</td>
                  <td>{new Date(ticket.createdAt).toDateString("dd/MM/yyyy")}</td>
                  <td className="max-w-full">{ticket.comment}</td>
                  <td>
                    <a href={`/ticket/${ticket.id}`} target="_blank" className="primary-btn text-white font-bold py-2 px-4 rounded">
                      <i className="fa fa-eye"></i>
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
