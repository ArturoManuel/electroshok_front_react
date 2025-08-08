// src/data/catalogo.js
import { api } from "../api";

export async function listarProductos() {
    return api("/catalogo", { method: "GET", auth: false });
}

export async function obtenerProducto(id) {
    return api(`/catalogo/${id}`, { method: "GET", auth: false });
}