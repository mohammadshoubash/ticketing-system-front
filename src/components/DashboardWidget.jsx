export default function Dashboard({ classes, title, value }) {
  return (
    <div className="grid grid-cols-2 bg-white p-6 rounded-xl shadow-xl items-center space-x-4 gap-2">
      {/* icon */}
      <i className={classes}></i>

      {/* stats */}
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
