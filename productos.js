/* ============================================================
   productos.js — Versión JavaScript del arreglo de productos
   (equivale a productos.php; la usa index.html en GitHub Pages,
   porque GitHub Pages no ejecuta PHP).

   Cada objeto tiene: id, nombre, descripcion, precio, emoji, color.
   ============================================================ */

"use strict";

const productos = [
    { id: 1, nombre: 'Laptop Pro 15"',  descripcion: "Intel Core i7, 16 GB RAM, SSD 512 GB. Ideal para programar y diseñar.",       precio: 899.99, emoji: "💻", color: "#2563eb" },
    { id: 2, nombre: "Smartphone Ultra",     descripcion: "Pantalla AMOLED 6.7\", cámara de 108 MP y batería de 5000 mAh.",          precio: 549.50, emoji: "📱", color: "#7c3aed" },
    { id: 3, nombre: "Audífonos Bluetooth",  descripcion: "Cancelación activa de ruido, 30 h de autonomía y cargador rápido.",       precio: 74.90,  emoji: "🎧", color: "#059669" },
    { id: 4, nombre: "Smartwatch Fit",       descripcion: "Monitor cardíaco, GPS integrado y resistencia al agua 5 ATM.",            precio: 129.00, emoji: "⌚", color: "#dc2626" },
    { id: 5, nombre: "Teclado Mecánico RGB", descripcion: "Switches táctiles, iluminación RGB personalizable y estructura aluminio.", precio: 89.99,  emoji: "⌨️", color: "#ea580c" },
    { id: 6, nombre: "Cámara Digital 4K",    descripcion: "Grabación 4K a 60 fps, lente 24 MP y pantalla táctil abatible.",          precio: 399.00, emoji: "📷", color: "#0891b2" }
];

/** Genera la imagen SVG inline (data URI) del producto. */
function imagenProducto(p) {
    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
        '<rect width="200" height="200" rx="16" fill="' + p.color + '"/>' +
        '<text x="50%" y="55%" font-size="90" text-anchor="middle" dominant-baseline="middle">' + p.emoji + '</text>' +
        '</svg>';
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

/** Construye el HTML de una tarjeta de producto. */
function tarjetaProducto(p) {
    return `
    <article class="tarjeta">
        <img src="${imagenProducto(p)}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <div class="tarjeta_pie">
            <span class="precio">$${p.precio.toFixed(2)}</span>
            <button class="btn-agregar" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}">
                🛒 Agregar
            </button>
        </div>
    </article>`;
}

/** Inserta todas las tarjetas en la página. */
function renderizarProductos() {
    const lista = document.getElementById("listaProductos");
    lista.innerHTML = productos.map(tarjetaProducto).join("");
}

document.addEventListener("DOMContentLoaded", renderizarProductos);
