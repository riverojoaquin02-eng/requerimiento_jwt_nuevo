import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, signout } = useAuth();

  const handleLogout = () => {
    signout();
    window.location.href = "/login"; // redirigir al salir
  };

  return (
    <nav className="bg-indigo-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-lg"> Consulta Cédulas</h1>
      <div>
        {isAuthenticated ? (
          <>
            <a href="/consultar" className="mx-2 hover:underline">
              Consultar
            </a>
            <button
              onClick={handleLogout}
              className="mx-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login" className="mx-2 hover:underline">
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
}