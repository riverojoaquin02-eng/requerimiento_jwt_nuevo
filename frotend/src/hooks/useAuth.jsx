import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function signin(username, password) {
    const res = await fetch(`http://localhost:8000/api/v1/auth/login?username=${username}&password=${password}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    setToken(data.access_token);
  }

  function signout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const isAuthenticated = !!token;

  return { token, signin, signout, isAuthenticated };
}