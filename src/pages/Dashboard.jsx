import AppLayout from "../layouts/AppLayout.jsx"
import DashboardWidget from "../components/DashboardWidget.jsx"
import Breadcrumb from "../components/Breadcrumb.jsx"
import DashboardFilter from "../components/DashboardFilter.jsx"
import data from "../data/dumydata.json"

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="bg-green-500 p-6 max-w-full sm:px-6 lg:px-8 w-full">
        <div>
          <Breadcrumb items={[{ label: "Dashboard", href: "#" }]} />
          <div className="flex justify-between items-center mb-6 bg-yellow-500">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <a href="/create-ticket" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Create Ticket</a>
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
        <table className="min-w-full bg-white mt-6 rounded-xl shadow-2xl overflow-hidden">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Status</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Country</th>
              <th>Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy data */}
            {{ data.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.status}</td>
                  <td>Open</td>
                  <td>non-voice</td>
                  <td>High</td>
                  <td>John Doe</td>
                  <td>Support</td>
                  <td>USA</td>
                  <td>2025-10-15</td>
                  <td>Issue with login</td>
                </tr>
              )) 
            }}
            <tr>
              
            </tr>
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
