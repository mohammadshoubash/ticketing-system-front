import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
        <Navbar />
        <Sidebar />
        
        <main className='container'>{children}</main>
    </div>
  )
}