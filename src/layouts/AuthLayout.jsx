import Navbar from '../components/Navbar'

export default function AuthLayout({children}){
    return <div className="relative min-h-screen bg-gray-100 app-layout">
        <Navbar />
        <main className='container mx-auto'>
          <div className="w-full max-w-full p-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
    </div>
}