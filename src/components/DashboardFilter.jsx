export default function DashboardFilter() {
  return (
    <>
        {/* Filter */}
        <div>
        
        </div>

        {/* Search bar */}
        <div className="flex rounded-xl shadow-2xl bg-white p-4 flex items-center space-x-2 max-w-full">
            <i className="fa fa-search"></i>
            <input
                className="w-full focus:outline-none"
                placeholder="Search here"
                type="text"
            />
        </div>
    </>
  );
}
