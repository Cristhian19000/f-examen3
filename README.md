# 🛒 Ecommerce Frontend - Next.js

Este proyecto corresponde al desarrollo de la interfaz de usuario (Frontend) para el sistema básico de Ecommerce solicitado en la evaluación. Está construido utilizando **Next.js** (App Router) y estilizado con **Tailwind CSS** para ofrecer una experiencia fluida, responsiva y con un diseño moderno en modo oscuro.

El sistema se conecta de manera directa a una API RESTful desarrollada en Express.js alojada en la nube, permitiendo una gestión CRUD completa de los productos en tiempo real.

---

## 🚀 Características Principales

* **Catálogo Interactivo (GET):** Listado de productos en una cuadrícula responsiva que consume datos dinámicos desde el backend en Render.
* **Formulario de Registro (POST):** Permite añadir nuevos artículos enviando los datos estructurados al servidor, donde se valida la información y se le asigna de manera automática una imagen mediante una API externa.
* **Edición del Catálogo (PUT):** Formulario dinámico adaptado para actualizar la información de productos existentes por su ID.
* **Remoción Segura (DELETE):** Eliminación física de productos de la base de datos con actualización inmediata de la interfaz de usuario.
* **Modo Oscuro Integrado:** Paleta de colores optimizada para legibilidad y accesibilidad visual (`zinc-900` / `indigo-600`).

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** Next.js (Versión 15+)
* **Estilos:** Tailwind CSS (Diseño responsivo y adaptivo)
* **Empaquetador Local:** Webpack (Configurado para máxima compatibilidad con sistemas Windows)
* **Entorno de Ejecución:** Node.js

---

## 📂 Estructura del Código Fuente (`src/app`)

```text
├── src/
│   └── app/
│       ├── page.js             # Vista del Catálogo Principal (Listar / Eliminar)
│       ├── layout.js           # Estructura Global y Barra de Navegación Simétrica
│       ├── globals.css         # Configuraciones de Tailwind CSS
│       ├── nuevo/
│       │   └── page.js         # Formulario para Crear Nuevos Productos (POST)
│       └── editar/
│           └── [id]/
│               └── page.js     # Formulario Dinámico para Actualizar Productos (PUT)