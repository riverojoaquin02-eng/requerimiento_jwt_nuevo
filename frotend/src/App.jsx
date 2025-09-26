import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Consultar from "./pages/consultar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida */}
        <Route
          path="/consultar"
          element={
            <ProtectedRoute>
              <Consultar />
            </ProtectedRoute>
          }
        />

        {/* Si no encuentra ruta → redirigir a login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;