export default function Sidebar() {
    return (
        <div className="absolute">
            <aside className="sidebar fixed top-0 left-0 h-full w-64 bg-gray-300 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
                <nav>
                    <ul>
                        <li className="mb-4"><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                        <li className="mb-4"><a href="/create-ticket" className="hover:underline">Create Ticket</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    )
}