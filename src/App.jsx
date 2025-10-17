import './assets/css/App.css'
import { BrowserRouter,  Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard.jsx'
import CreateTicket from './pages/CreateTicket.jsx'
import TicketDetails from './pages/TicketDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create-ticket' element={<CreateTicket />} />
        <Route path='/ticket/:id' element={<TicketDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App