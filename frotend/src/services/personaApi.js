export async function getPersona(cedula, token) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/personas/${cedula}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) throw new Error("401");
  if (res.status === 404) throw new Error("404");
  if (res.status === 400) throw new Error("400");

  return res.json();
}