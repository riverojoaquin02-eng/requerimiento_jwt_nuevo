import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Alert from "../components/alert";

export default function Login() {
  const { signin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      setError(null);
      window.location.href = "/consultar"; // redirige tras login
    } catch {
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Iniciar Sesión
        </h2>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Usuario con required y maxlength */}
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={20}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />

          {/* Campo Contraseña con required y maxlength */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}