const API_BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:4001/api/v1").replace(/\/+$/, "");
const join = (base, p) => `${base}/${String(p).replace(/^\/+/, "")}`;

export async function api(path, { method = "GET", body, auth = true, headers = {} } = {}) {
    const token = localStorage.getItem("token");
    const url = join(API_BASE, path);
    const res = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    });

    let payload;
    const text = await res.text();
    try {
        payload = text ? JSON.parse(text) : {};
    } catch {
        payload = text;
    }

    if (!res.ok) throw new Error(typeof payload === "string" ? payload : (payload.message || "Error API"));

    return payload;
}