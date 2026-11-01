/* ============================================================
   carrito.js — Práctica 3 · Grupo 4
   Lógica del carrito de compras en JavaScript:
   - Detecta los botones "Agregar" (delegación de eventos).
   - Guarda el carrito en localStorage (persiste al recargar).
   - Muestra/oculta el panel desplegable del carrito.
   - Calcula el total con reduce().
   ============================================================ */

"use strict";

const CLAVE_CARRITO = "carritoPWA";

/* ---------- Estado ---------- */
let carrito = cargarCarrito();

/* ---------- Referencias del DOM ---------- */
const btnAbrirCarrito  = document.getElementById("btnAbrirCarrito");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");
const panelCarrito     = document.getElementById("panelCarrito");
const itemsCarrito     = document.getElementById("itemsCarrito");
const carritoVacio     = document.getElementById("carritoVacio");
const contadorCarrito  = document.getElementById("contadorCarrito");
const totalCarrito     = document.getElementById("totalCarrito");
const totalPanel       = document.getElementById("totalPanel");

/* ---------- Utilidades ---------- */
function cargarCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
        return [];
    }
}

function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function formatearPrecio(n) {
    return "$" + n.toFixed(2);
}

/* ---------- Acciones del carrito ---------- */
function agregarProducto(id, nombre, precio) {
    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    renderizarCarrito();
}

function quitarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

/* ---------- Renderizado ---------- */
function renderizarCarrito() {
    itemsCarrito.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
    } else {
        carritoVacio.style.display = "none";
        carrito.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre} × ${item.cantidad}</span>
                <span>${formatearPrecio(item.precio * item.cantidad)}</span>
                <button class="btn-quitar" data-id="${item.id}">Quitar</button>
            `;
            itemsCarrito.appendChild(li);
        });
    }

    const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const total         = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    contadorCarrito.textContent = String(cantidadTotal);
    totalCarrito.textContent    = formatearPrecio(total);
    totalPanel.textContent      = formatearPrecio(total);
}

/* ---------- Eventos ---------- */

// 1. Abrir / cerrar el panel del carrito
btnAbrirCarrito.addEventListener("click", () => panelCarrito.classList.remove("oculto"));
btnCerrarCarrito.addEventListener("click", () => panelCarrito.classList.add("oculto"));

// 2. Delegación de eventos: cualquier botón "Agregar" (incluso los creados por JS)
document.addEventListener("click", (evento) => {
    const btnAgregar = evento.target.closest(".btn-agregar");
    if (btnAgregar) {
        agregarProducto(
            Number(btnAgregar.dataset.id),
            btnAgregar.dataset.nombre,
            Number(btnAgregar.dataset.precio)
        );
        return;
    }

    const btnQuitar = evento.target.closest(".btn-quitar");
    if (btnQuitar) {
        quitarProducto(Number(btnQuitar.dataset.id));
    }
});

/* ---------- Inicio ---------- */
renderizarCarrito();
