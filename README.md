Markdown
#  TechStore - Simulador Interactivo de Compras (Entrega Final)

Este proyecto corresponde a la **Entrega Final** del curso de JavaScript. Consiste en un simulador de e-commerce que permite explorar un catálogo de productos, gestionar un carrito de compras interactivo con persistencia de datos y simular el proceso comercial completo de compra.

## Tecnologías y Herramientas Utilizadas

- **HTML5 & CSS3:** Maquetación responsiva, limpia y modular.
- **JavaScript (ES6+):** Lógica interactiva completa, eventos, manipulación del DOM y sintaxis avanzada.
- **JSON & Fetch API:** Consumo de datos asíncrono desde un archivo local con la estructura `async/await` y bloques `try/catch/finally`.
- **LocalStorage:** Persistencia del carrito de compras (guardar, actualizar, eliminar ítems y vaciar).
- **Librerías Externas (vía CDN):**
  - [SweetAlert2](https://sweetalert2.github.io/): Para modales dinámicos y confirmación de compra (reemplazando `alert` y `confirm` nativos).
  - [Toastify.js](https://apvarun.github.io/toastify-js/): Para notificaciones emergentes tras acciones del usuario.

## estructura del Proyecto

```text
├── index.html
├── README.md
├── assets/
│   └── styles.css
├── data/
│   └── productos.json
└── js/
    └── main.js