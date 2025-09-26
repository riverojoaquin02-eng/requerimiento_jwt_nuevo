export async function login(username, password) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/auth/login?username=${username}&password=${password}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Credenciales inválidas");
  return res.json();
}