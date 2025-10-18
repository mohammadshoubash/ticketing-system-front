import Navbar from '../components/Navbar.jsx'

export default function AppLayout({ children }) {
  return (
    <div className="app-layout relative bg-gray-100 min-h-screen">
        <Navbar />
        <main className='container mx-auto'>
          <div className="p-6 max-w-full sm:px-6 lg:px-8 w-full">
            {children}
          </div>
        </main>
    </div>
  )
}