<?php
/**
 * funciones.php
 * Funciones de apoyo para index.php (demuestra el uso de funciones en PHP).
 */

/** Formatea un precio en dólares: 899.99 -> "$899.99" */
function formatearPrecio(float $precio): string {
    return '$' . number_format($precio, 2);
}

/** Genera la imagen SVG inline (data URI) del producto. */
function imagenProducto(array $p): string {
    $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">'
         . '<rect width="200" height="200" rx="16" fill="' . htmlspecialchars($p['color']) . '"/>'
         . '<text x="50%" y="55%" font-size="90" text-anchor="middle" dominant-baseline="middle">'
         . $p['emoji'] . '</text></svg>';
    return 'data:image/svg+xml;charset=UTF-8,' . rawurlencode($svg);
}

/** Devuelve el HTML de una tarjeta de producto (pasos 2-4 del ejercicio). */
function tarjetaProducto(array $p): string {
    $img    = imagenProducto($p);
    $precio = formatearPrecio($p['precio']);
    return <<<HTML
    <article class="tarjeta">
        <img src="{$img}" alt="{$p['nombre']}">
        <h3>{$p['nombre']}</h3>
        <p>{$p['descripcion']}</p>
        <div class="tarjeta_pie">
            <span class="precio">{$precio}</span>
            <button class="btn-agregar" data-id="{$p['id']}" data-nombre="{$p['nombre']}" data-precio="{$p['precio']}">
                🛒 Agregar
            </button>
        </div>
    </article>
HTML;
}
