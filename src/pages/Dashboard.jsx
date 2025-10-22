import AppLayout from "../layouts/AppLayout.jsx"
import DashboardWidget from "../components/DashboardWidget.jsx"
import Breadcrumb from "../components/Breadcrumb.jsx"
import DashboardFilter from "../components/DashboardFilter.jsx"
import Pagination from "../components/Pagination.jsx"
import { useEffect } from "react"
import axios from "axios"

export default function Dashboard() {
  useEffect(() => {
      async function fetchData() {
          const response = await axios.get('http://127.0.0.1:8000/api/tickets', {
            headers : {
              'Content-Type' : 'application/json',
              Authorization : `Bearer ${localStorage.getItem('auth-token')}`
            }
          });

          const content = document.getElementById('tableBody');

          if(response.data.length === 0 || localStorage.getItem('auth-token') == null){
            content.innerHTML += (`
            <tr>
              <td colspan="10">
                No Data
              </td>
            </tr>`)
          } else {
            response.data.map(ticket => {
              content.innerHTML += (`<tr key=${ticket.id}>
                  <td><b>#${ticket.id}</b></td>
                  
                  <td>${'N/A'}</td>
                  
                  <td>${ticket.type == "voice" ? "Voice" : "Non-Voice"}</td>
                  
                  <td>${ticket.priority}</td>
                  
                  <td>${'N/A'}</td>

                  <td>${ticket.status}</td>
                  
                  <td>${ticket.country}</td>
                  
                  <td>${new Date(ticket.created_at).toDateString("dd/MM/yyyy")}</td>
                  
                  <td class="max-w-full">${ticket.comment}</td>

                  <td>
                    <a class="px-4 py-2 font-bold text-white rounded primary-btn-outline" href='/ticket/${ticket.id}'>
                      <i class="fa fa-eye"></i>
                    </a>
                  </td>
                </tr>`);
            });
          }

          console.log(response.data);
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
          <DashboardWidget value={123} title="Total" classes="fa fa-envelope-open-text fa-3x text-blue-500" />
          <DashboardWidget value={123} title="Open" classes="fa fa-ticket fa-3x text-yellow-500" />
          <DashboardWidget value={123} title="In Progress" classes="fa fa-solid fa-spinner fa-3x text-red-500" />
          <DashboardWidget value={123} title="Closed" classes="fa fa-check-circle fa-3x text-green-500" />
        </div>

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
          <tbody id="tableBody">
            
          </tbody>
        </table>

        {/* Pagination */}
        {/* <div className="flex justify-center mt-2">
          <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log("Go to page:", page)} />
        </div> */}
    </AppLayout>
  );
}
