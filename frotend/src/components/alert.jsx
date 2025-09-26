export default function Alert({ message, type }) {
  const colors = {
    error: "bg-red-100 text-red-800 border-red-400",
    success: "bg-green-100 text-green-800 border-green-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
  };

  return (
    <div className={`border px-4 py-3 rounded relative mt-4 ${colors[type]}`}>
      {message}
    </div>
  );
}