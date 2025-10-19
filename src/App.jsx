import './assets/css/App.css'
import { BrowserRouter,  Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard.jsx'
import CreateTicket from './pages/CreateTicket.jsx'
import TicketDetails from './pages/TicketDetails.jsx'
import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-ticket' element={<CreateTicket />} />
        <Route path='/ticket/:id' element={<TicketDetails />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App