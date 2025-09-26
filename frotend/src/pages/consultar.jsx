import { useState } from "react";
import { getPersona } from "../services/personaApi";
import Alert from "../components/alert";

export default function Consultar() {
  const [cedula, setCedula] = useState("");
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState(null);

  // Aceptar solo números y máximo 8 dígitos
  const handleCedulaChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // elimina cualquier no-numérico
    if (value.length <= 8) setCedula(value);
  };

  async function handleSearch() {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ Necesitas iniciar sesión primero.");
      return;
    }
    try {
      const res = await getPersona(cedula, token);
      setPersona(res);
      setError(null);
    } catch (e) {
      setPersona(null);
      if (e.message === "401") setError("❌ Sesión no válida o expirada, vuelve a iniciar sesión.");
      else if (e.message === "404") setError("Cédula no encontrada.");
      else if (e.message === "400") setError("Formato de cédula inválido.");
    }
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8">
        Consultar Persona por Cédula
      </h1>
      <div className="flex space-x-2">
        <input
          type="text"
          inputMode="numeric"     // teclado numérico en móviles
          pattern="[0-9]*"       // solo números
          placeholder="Ingrese cédula (8 dígitos)"
          value={cedula}
          onChange={handleCedulaChange}
          className="p-2 border rounded w-64 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Buscar
        </button>
      </div>
      {error && <Alert message={error} type="error" />}
      {persona && (
        <div className="mt-6 p-4 bg-white shadow rounded text-center border w-64">
          <h2 className="font-bold text-xl text-gray-700">{persona.nombre}</h2>
          <p className="text-gray-500">Cédula: {persona.cedula}</p>
        </div>
      )}
    </div>
  );
}