import Navbar from '../components/Navbar.jsx'

export default function AppLayout({ children }) {
  return (
    <div className="app-layout relative bg-gray-100 min-h-screen">
        <Navbar />
        <main className='container mx-auto'>{children}</main>
    </div>
  )
}